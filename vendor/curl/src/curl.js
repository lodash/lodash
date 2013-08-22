/** @license MIT License (c) copyright 2010-2013 B Cavalier & J Hann */

/**
 * curl (cujo resource loader)
 * An AMD-compliant javascript module and resource loader
 *
 * curl is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (global) {
//"use strict"; don't restore this until the config routine is refactored
	var
		version = '0.7.6',
		curlName = 'curl',
		defineName = 'define',
		runModuleAttr = 'data-curl-run',
		userCfg,
		prevCurl,
		prevDefine,
		doc = global.document,
		head = doc && (doc['head'] || doc.getElementsByTagName('head')[0]),
		// to keep IE from crying, we need to put scripts before any
		// <base> elements, but after any <meta>. this should do it:
		insertBeforeEl = head && head.getElementsByTagName('base')[0] || null,
		// constants / flags
		msgUsingExports = {},
		msgFactoryExecuted = {},
		// this is the list of scripts that IE is loading. one of these will
		// be the "interactive" script. too bad IE doesn't send a readystatechange
		// event to tell us exactly which one.
		activeScripts = {},
		// readyStates for IE6-9
		readyStates = 'addEventListener' in global ? {} : { 'loaded': 1, 'complete': 1 },
		// these are always handy :)
		cleanPrototype = {},
		toString = cleanPrototype.toString,
		undef,
		// local cache of resource definitions (lightweight promises)
		cache = {},
		// local url cache
		urlCache = {},
		// preload are files that must be loaded before any others
		preload = false,
		// net to catch anonymous define calls' arguments (non-IE browsers)
		argsNet,
		// RegExp's used later, pre-compiled here
		dontAddExtRx = /\?|\.js\b/,
		absUrlRx = /^\/|^[^:]+:\/\//,
		findDotsRx = /(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g,
		removeCommentsRx = /\/\*[\s\S]*?\*\/|\/\/.*?[\n\r]/g,
		findRValueRequiresRx = /require\s*\(\s*(["'])(.*?[^\\])\1\s*\)|[^\\]?(["'])/g,
		splitMainDirectives = /\s*,\s*/,
		cjsGetters,
		core;

	function noop () {}

	function isType (obj, type) {
		return toString.call(obj).indexOf('[object ' + type) == 0;
	}

	function normalizePkgDescriptor (descriptor) {
		var main;

		descriptor.path = removeEndSlash(descriptor['path'] || descriptor['location'] || '');
		main = descriptor['main'] || './main';
		if (!isRelUrl(main)) main = './' + main;
		// trailing slashes trick reduceLeadingDots to see them as base ids
		descriptor.main = reduceLeadingDots(main, descriptor.name + '/');
		//if (isRelUrl(descriptor.main)) throw new Error('invalid main (' + main + ') in ' + descriptor.name);
		descriptor.config = descriptor['config'];

		return descriptor;
	}

	function isRelUrl (it) {
		return it.charAt(0) == '.';
	}

	function isAbsUrl (it) {
		return absUrlRx.test(it);
	}

	function joinPath (path, file) {
		return removeEndSlash(path) + '/' + file;
	}

	function removeEndSlash (path) {
		return path && path.charAt(path.length - 1) == '/' ? path.substr(0, path.length - 1) : path;
	}

	function reduceLeadingDots (childId, baseId) {
		// this algorithm is similar to dojo's compactPath, which interprets
		// module ids of "." and ".." as meaning "grab the module whose name is
		// the same as my folder or parent folder".  These special module ids
		// are not included in the AMD spec but seem to work in node.js, too.
		var removeLevels, normId, levels, isRelative, diff;

		removeLevels = 1;
		normId = childId;

		// remove leading dots and count levels
		if (isRelUrl(normId)) {
			isRelative = true;
			normId = normId.replace(findDotsRx, function (m, dot, doubleDot, remainder) {
				if (doubleDot) removeLevels++;
				return remainder || '';
			});
		}

		if (isRelative) {
			levels = baseId.split('/');
			diff = levels.length - removeLevels;
			if (diff < 0) {
				// this is an attempt to navigate above parent module.
				// maybe dev wants a url or something. punt and return url;
				return childId;
			}
			levels.splice(diff, removeLevels);
			// normId || [] prevents concat from adding extra "/" when
			// normId is reduced to a blank string
			return levels.concat(normId || []).join('/');
		}
		else {
			return normId;
		}
	}

	function pluginParts (id) {
		var delPos = id.indexOf('!');
		return {
			resourceId: id.substr(delPos + 1),
			// resourceId can be zero length
			pluginId: delPos >= 0 && id.substr(0, delPos)
		};
	}

	function Begetter () {}

	function beget (parent, mixin) {
		Begetter.prototype = parent || cleanPrototype;
		var child = new Begetter();
		Begetter.prototype = cleanPrototype;
		for (var p in mixin) child[p] = mixin[p];
		return child;
	}

	function Promise () {

		var self, thens, complete;

		self = this;
		thens = [];

		function then (resolved, rejected, progressed) {
			// capture calls to callbacks
			thens.push([resolved, rejected, progressed]);
		}

		function notify (which, arg) {
			// complete all callbacks
			var aThen, cb, i = 0;
			while ((aThen = thens[i++])) {
				cb = aThen[which];
				if (cb) cb(arg);
			}
		}

		complete = function promiseComplete (success, arg) {
			// switch over to sync then()
			then = success ?
				function (resolved, rejected) { resolved && resolved(arg); } :
				function (resolved, rejected) { rejected && rejected(arg); };
			// we no longer throw during multiple calls to resolve or reject
			// since we don't really provide useful information anyways.
			complete = noop;
			// complete all callbacks
			notify(success ? 0 : 1, arg);
			// no more notifications
			notify = noop;
			// release memory
			thens = undef;
		};

		this.then = function (resolved, rejected, progressed) {
			then(resolved, rejected, progressed);
			return self;
		};
		this.resolve = function (val) {
			self.resolved = val;
			complete(true, val);
		};
		this.reject = function (ex) {
			self.rejected = ex;
			complete(false, ex);
		};
		this.progress = function (msg) {
			notify(2, msg);
		}

	}

	function isPromise (o) {
		return o instanceof Promise || o instanceof CurlApi;
	}

	function when (promiseOrValue, callback, errback, progback) {
		// we can't just sniff for then(). if we do, resources that have a
		// then() method will make dependencies wait!
		if (isPromise(promiseOrValue)) {
			return promiseOrValue.then(callback, errback, progback);
		}
		else {
			return callback(promiseOrValue);
		}
	}

	/**
	 * Returns a function that when executed, executes a lambda function,
	 * but only executes it the number of times stated by howMany.
	 * When done executing, it executes the completed function. Each callback
	 * function receives the same parameters that are supplied to the
	 * returned function each time it executes.  In other words, they
	 * are passed through.
	 * @private
	 * @param howMany {Number} must be greater than zero
	 * @param lambda {Function} executed each time
	 * @param completed {Function} only executes once when the counter
	 *   reaches zero
	 * @returns {Function}
	 */
	function countdown (howMany, lambda, completed) {
		var result;
		return function () {
			if (--howMany >= 0 && lambda) result = lambda.apply(undef, arguments);
			// we want ==, not <=, since some callers expect call-once functionality
			if (howMany == 0 && completed) completed(result);
			return result;
		}
	}

	core = {

		/**
		 * * reduceLeadingDots of id against parentId
		 *		- if there are too many dots (path goes beyond parent), it's a url
		 *			- return reduceLeadingDots of id against baseUrl + parentId;
		 *	* if id is a url (starts with dots or slash or protocol)
		 *		- pathInfo = { config: userCfg, url: url }
		 *	* if not a url, id-to-id transform here.
		 *		- main module expansion
		 *		- plugin prefix expansion
		 *		- coordinate main module expansion with plugin expansion
		 *			- main module expansion happens first
		 *		- future: other transforms?
		 * @param id
		 * @param parentId
		 * @param cfg
		 * @return {*}
		 */
		toAbsId: function (id, parentId, cfg) {
			var absId, pluginId, parts;

			absId = reduceLeadingDots(id, parentId);

			// if this is still a relative path, it must be a url
			// so just punt, otherwise...
			if (isRelUrl(absId)) return absId;

			// plugin id split
			parts = pluginParts(absId);
			pluginId = parts.pluginId;
			absId = pluginId || parts.resourceId;

			// main id expansion
			if (absId in cfg.pathMap) {
				absId = cfg.pathMap[absId].main || absId;
			}

			// plugin id expansion
			if (pluginId) {
				if (pluginId.indexOf('/') < 0 && !(pluginId in cfg.pathMap)) {
					absId = joinPath(cfg.pluginPath, pluginId);
				}
				absId = absId + '!' + parts.resourceId;
			}

			return absId;
		},

		createContext: function (cfg, baseId, depNames, isPreload) {

			var def;

			def = new Promise();
			def.id = baseId || ''; // '' == global
			def.isPreload = isPreload;
			def.depNames = depNames;
			def.config = cfg;

			// functions that dependencies will use:

			function toAbsId (childId, checkPlugins) {
				var absId, parts, plugin;

				absId = core.toAbsId(childId, def.id, cfg);
				if (!checkPlugins) return absId;

				parts = pluginParts(absId);
				if (!parts.pluginId) return absId;

				plugin = cache[parts.pluginId];
				// check if plugin supports the normalize method
				if ('normalize' in plugin) {
					// note: dojo/has may return falsey values (0, actually)
					parts.resourceId = plugin['normalize'](parts.resourceId, toAbsId, def.config) || '';
				}
				else {
					parts.resourceId = toAbsId(parts.resourceId);
				}
				return parts.pluginId + '!' + parts.resourceId;
			}

			function toUrl (n) {
				// the AMD spec states that we should not append an extension
				// in this function since it could already be appended.
				// we need to use toAbsId in case this is a module id.
				return core.resolvePathInfo(toAbsId(n, true), cfg).url;
			}

			function localRequire (ids, callback, errback) {
				var cb, rvid, childDef, earlyExport;

				// this is public, so send pure function
				// also fixes issue #41
				cb = callback && function () { callback.apply(undef, arguments[0]); };

				// RValue require (CommonJS)
				if (isType(ids, 'String')) {
					if (cb) {
						throw new Error('require(id, callback) not allowed');
					}
					// return resource
					rvid = toAbsId(ids, true);
					childDef = cache[rvid];
					if (!(rvid in cache)) {
						// this should only happen when devs attempt their own
						// manual wrapping of cjs modules or get confused with
						// the callback syntax:
						throw new Error('Module not resolved: '  + rvid);
					}
					earlyExport = isPromise(childDef) && childDef.exports;
					return earlyExport || childDef;
				}
				else {
					when(core.getDeps(core.createContext(cfg, def.id, ids, isPreload)), cb, errback);
				}
			}

			def.require = localRequire;
			localRequire['toUrl'] = toUrl;
			def.toAbsId = toAbsId;

			return def;
		},

		createResourceDef: function (cfg, id, isPreload) {
			var def, origResolve, execute;

			def = core.createContext(cfg, id, undef, isPreload);
			origResolve = def.resolve;

			// using countdown to only execute definition function once
			execute = countdown(1, function (deps) {
				def.deps = deps;
				try {
					return core.executeDefFunc(def);
				}
				catch (ex) {
					def.reject(ex);
				}
			});

			// intercept resolve function to execute definition function
			// before resolving
			def.resolve = function resolve (deps) {
				when(isPreload || preload, function () {
					origResolve((cache[def.id] = urlCache[def.url] = execute(deps)));
				});
			};

			// track exports
			def.exportsReady = function executeFactory (deps) {
				when(isPreload || preload, function () {
					// only resolve early if we also use exports (to avoid
					// circular dependencies). def.exports will have already
					// been set by the getDeps loop before we get here.
					if (def.exports) {
						execute(deps);
						def.progress(msgFactoryExecuted);
					}
				});
			};

			return def;
		},

		createPluginDef: function (cfg, id, resId, isPreload) {
			var def;

			// use resource id for local require and toAbsId
			def = core.createContext(cfg, resId, undef, isPreload);

			return def;
		},

		getCjsRequire: function (def) {
			return def.require;
		},

		getCjsExports: function (def) {
			return def.exports || (def.exports = {});
		},

		getCjsModule: function (def) {
			var module = def.module;
			if (!module) {
				module = def.module = {
					'id': def.id,
					'uri': core.getDefUrl(def),
					'exports': core.getCjsExports(def),
					'config': function () { return def.config; }
				};
				module.exports = module['exports']; // oh closure compiler!
			}
			return module;
		},

		getDefUrl: function (def) {
			// note: this is used by cjs module.uri
			return def.url || (def.url = core.checkToAddJsExt(def.require['toUrl'](def.id), def.config));
		},

		/**
		 * Sets the curl() and define() APIs.
		 * @param [cfg] {Object|Null} set of config params. If missing or null,
		 *   this function will set the default API!
		 */
		setApi: function (cfg) {
			/*
			scenarios:
			1. global config sets apiName: "require"
				- first call to config sets api
				- second and later calls are ignored
				- prevCurl cannot exist
			2. no global config, first call to config() sets api
				- first call to config has no api info
				- second call to config sets api
				- third and later calls must be ignored
			3. global config that doesn't set api, first call does though
				- same as #2
			4. api info is never set
				- how to know when to stop ignoring?

			objectives:
			1. fail before mistakenly overwriting global[curlName]
			2. allow rename/relocate of curl() and define()
			3. restore curl() if we overwrote it
			 */

			var apiName, defName, apiObj, defObj,
				failMsg, okToOverwrite;

			apiName = curlName;
			defName = defineName;
			apiObj = defObj = global;
			failMsg = ' already exists';

			// if we're not setting defaults
			if (cfg) {
				// is it ok to overwrite existing api functions?
				okToOverwrite = cfg['overwriteApi'] || cfg.overwriteApi;
				// allow dev to rename/relocate curl() to another object
				apiName = cfg['apiName'] || cfg.apiName || apiName;
				apiObj = cfg['apiContext'] || cfg.apiContext || apiObj;
				// define() too
				defName = cfg['defineName'] || cfg.defineName || defName;
				defObj = cfg['defineContext'] || cfg.defineContext || defObj;

				// curl() already existed, restore it if this is not a
				// setDefaults pass. dev must be a good citizen and set
				// apiName/apiContext (see below).
				if (prevCurl && isType(prevCurl, 'Function')) {
					// restore previous curl()
					global[curlName] = prevCurl;
				}
				prevCurl = null; // don't check ever again
				// ditto for define()
				if (prevDefine && isType(prevDefine, 'Function')) {
					// restore previous curl()
					global[defineName] = prevDefine;
				}
				prevDefine = null; // don't check ever again

				// check if we're mistakenly overwriting either api
				// if we're configuring, and there's a curl(), and it's not
				// ours -- and we're not explicitly overwriting -- throw!
				// Note: if we're setting defaults, we *must* overwrite curl
				// so that dev can configure it.  This is no different than
				// noConflict()-type methods.
				if (!okToOverwrite) {
					if (apiObj[apiName] && apiObj[apiName] != _curl) {
						throw new Error(apiName + failMsg);
					}
					// check if we're overwriting amd api
					if (defObj[defName] && defObj[defName] != define) {
						throw new Error(defName + failMsg);
					}
				}

			}

			// set curl api
			apiObj[apiName] = _curl;

			// set AMD public api: define()
			defObj[defName] = define;

		},

		config: function (cfg) {
			var prevCfg, newCfg, pluginCfgs, p;

			// convert from closure-safe names
			if ('baseUrl' in cfg) cfg.baseUrl = cfg['baseUrl'];
			if ('main' in cfg) cfg.main = cfg['main'];
			if ('preloads' in cfg) cfg.preloads = cfg['preloads'];
			if ('pluginPath' in cfg) cfg.pluginPath = cfg['pluginPath'];
			if ('dontAddFileExt' in cfg || cfg.dontAddFileExt) {
				cfg.dontAddFileExt = new RegExp(cfg['dontAddFileExt'] || cfg.dontAddFileExt);
			}

			prevCfg = userCfg;
			newCfg = beget(prevCfg, cfg);

			// create object to hold path map.
			// each plugin and package will have its own pathMap, too.
			newCfg.pathMap = beget(prevCfg.pathMap);
			pluginCfgs = cfg['plugins'] || {};
			newCfg.plugins = beget(prevCfg.plugins);
			newCfg.paths = beget(prevCfg.paths, cfg.paths);
			newCfg.packages = beget(prevCfg.packages, cfg.packages);

			// temporary arrays of paths. this will be converted to
			// a regexp for fast path parsing.
			newCfg.pathList = [];

			// normalizes path/package info and places info on either
			// the global cfg.pathMap or on a plugin-specific altCfg.pathMap.
			// also populates a pathList on cfg or plugin configs.
			function fixAndPushPaths (coll, isPkg) {
				var id, pluginId, data, parts, currCfg, info;
				for (var name in coll) {
					data = coll[name];
					if (isType(data, 'String')) data = {
						path: coll[name]
					};
					// grab the package id, if specified. default to
					// property name, if missing.
					data.name = data.name || name;
					currCfg = newCfg;
					// check if this is a plugin-specific path
					parts = pluginParts(removeEndSlash(data.name));
					id = parts.resourceId;
					pluginId = parts.pluginId;
					if (pluginId) {
						// plugin-specific path
						currCfg = pluginCfgs[pluginId];
						if (!currCfg) {
							currCfg = pluginCfgs[pluginId] = beget(newCfg);
							currCfg.pathMap = beget(newCfg.pathMap);
							currCfg.pathList = [];
						}
						// remove plugin-specific path from coll
						delete coll[name];
					}
					if (isPkg) {
						info = normalizePkgDescriptor(data);
						if (info.config) info.config = beget(newCfg, info.config);
					}
					else {
						info = { path: removeEndSlash(data.path) };
					}
					info.specificity = id.split('/').length;
					if (id) {
						currCfg.pathMap[id] = info;
						currCfg.pathList.push(id);
					}
					else {
						// naked plugin name signifies baseUrl for plugin
						// resources. baseUrl could be relative to global
						// baseUrl.
						currCfg.baseUrl = core.resolveUrl(data.path, newCfg);
					}
				}
			}

			// adds the path matching regexp onto the cfg or plugin cfgs.
			function convertPathMatcher (cfg) {
				var pathMap = cfg.pathMap;
				cfg.pathRx = new RegExp('^(' +
					cfg.pathList.sort(function (a, b) { return pathMap[b].specificity - pathMap[a].specificity; } )
						.join('|')
						.replace(/\/|\./g, '\\$&') +
					')(?=\\/|$)'
				);
				delete cfg.pathList;
			}

			// fix all new packages, then paths (in case there are
			// plugin-specific paths for a main module, such as wire!)
			fixAndPushPaths(cfg['packages'], true);
			fixAndPushPaths(cfg['paths'], false);

			// process plugins after packages in case we already perform an
			// id transform on a plugin (i.e. it's a package.main)
			for (p in pluginCfgs) {
				var absId = core.toAbsId(p + '!', '', newCfg);
				newCfg.plugins[absId.substr(0, absId.length - 1)] = pluginCfgs[p];
			}
			pluginCfgs = newCfg.plugins;

			// create search regex for each path map
			for (p in pluginCfgs) {
				// inherit full config
				pluginCfgs[p] = beget(newCfg, pluginCfgs[p]);
				var pathList = pluginCfgs[p].pathList;
				if (pathList) {
					pluginCfgs[p].pathList = pathList.concat(newCfg.pathList);
					convertPathMatcher(pluginCfgs[p]);
				}
			}

			// ugh, this is ugly, but necessary until we refactor this function
			// copy previous pathMap items onto pathList
			for (p in prevCfg.pathMap) {
				if (!newCfg.pathMap.hasOwnProperty(p)) newCfg.pathList.push(p);
			}

			convertPathMatcher(newCfg);

			return newCfg;

		},

		resolvePathInfo: function (absId, cfg) {
			// searches through the configured path mappings and packages
			var pathMap, pathInfo, path, pkgCfg;

			pathMap = cfg.pathMap;

			if (!isAbsUrl(absId)) {
				path = absId.replace(cfg.pathRx, function (match) {
					// TODO: remove fallbacks here since they should never need to happen
					pathInfo = pathMap[match] || {};
					pkgCfg = pathInfo.config;
					return pathInfo.path || '';
				});
			}
			else {
				path = absId;
			}

			return {
				config: pkgCfg || userCfg,
				url: core.resolveUrl(path, cfg)
			};
		},

		resolveUrl: function (path, cfg) {
			var baseUrl = cfg.baseUrl;
			return baseUrl && !isAbsUrl(path) ? joinPath(baseUrl, path) : path;
		},

		checkToAddJsExt: function (url, cfg) {
			// don't add extension if a ? is found in the url (query params)
			// i'd like to move this feature to a moduleLoader
			return url + ((cfg || userCfg).dontAddFileExt.test(url) ? '' : '.js');
		},

		loadScript: function (def, success, failure) {
			// script processing rules learned from RequireJS

			// insert script
			var el = doc.createElement('script');

			// initial script processing
			function process (ev) {
				ev = ev || global.event;
				// detect when it's done loading
				// ev.type == 'load' is for all browsers except IE6-9
				// IE6-9 need to use onreadystatechange and look for
				// el.readyState in {loaded, complete} (yes, we need both)
				if (ev.type == 'load' || readyStates[el.readyState]) {
					delete activeScripts[def.id];
					// release event listeners
					el.onload = el.onreadystatechange = el.onerror = ''; // ie cries if we use undefined
					success();
				}
			}

			function fail (e) {
				// some browsers send an event, others send a string,
				// but none of them send anything useful, so just say we failed:
				failure(new Error('Syntax or http error: ' + def.url));
			}

			// set type first since setting other properties could
			// prevent us from setting this later
			// actually, we don't even need to set this at all
			//el.type = 'text/javascript';
			// using dom0 event handlers instead of wordy w3c/ms
			el.onload = el.onreadystatechange = process;
			el.onerror = fail;
			// js! plugin uses alternate mimetypes
			el.type = def.mimetype || 'text/javascript';
			// TODO: support other charsets?
			el.charset = 'utf-8';
			el.async = !def.order;
			el.src = def.url;

			// loading will start when the script is inserted into the dom.
			// IE will load the script sync if it's in the cache, so
			// indicate the current resource definition if this happens.
			activeScripts[def.id] = el;

			head.insertBefore(el, insertBeforeEl);

			// the js! plugin uses this
			return el;
		},

		extractCjsDeps: function (defFunc) {
			// Note: ignores require() inside strings and comments
			var source, ids = [], currQuote;
			// prefer toSource (FF) since it strips comments
			source = typeof defFunc == 'string' ?
					 defFunc :
					 defFunc.toSource ? defFunc.toSource() : defFunc.toString();
			// remove comments, then look for require() or quotes
			source.replace(removeCommentsRx, '').replace(findRValueRequiresRx, function (m, rq, id, qq) {
				// if we encounter a string in the source, don't look for require()
				if (qq) {
					currQuote = currQuote == qq ? undef : currQuote;
				}
				// if we're not inside a quoted string
				else if (!currQuote) {
					ids.push(id);
				}
				return ''; // uses least RAM/CPU
			});
			return ids;
		},

		fixArgs: function (args) {
			// resolve args
			// valid combinations for define:
			// (string, array, object|function) sax|saf
			// (array, object|function) ax|af
			// (string, object|function) sx|sf
			// (object|function) x|f

			var id, deps, defFunc, defFuncArity, len, cjs;

			len = args.length;

			defFunc = args[len - 1];
			defFuncArity = isType(defFunc, 'Function') ? defFunc.length : -1;

			if (len == 2) {
				if (isType(args[0], 'Array')) {
					deps = args[0];
				}
				else {
					id = args[0];
				}
			}
			else if (len == 3) {
				id = args[0];
				deps = args[1];
			}

			// Hybrid format: assume that a definition function with zero
			// dependencies and non-zero arity is a wrapped CommonJS module
			if (!deps && defFuncArity > 0) {
				cjs = true;
				deps = ['require', 'exports', 'module'].slice(0, defFuncArity).concat(core.extractCjsDeps(defFunc));
			}

			return {
				id: id,
				deps: deps || [],
				res: defFuncArity >= 0 ? defFunc : function () { return defFunc; },
				cjs: cjs
			};
		},

		executeDefFunc: function (def) {
			var resource, moduleThis;
			// the force of AMD is strong so anything returned
			// overrides exports.
			// node.js assumes `this` === `exports` so we do that
			// for all cjs-wrapped modules, just in case.
			// also, use module.exports if that was set
			// (node.js convention).
			// note: if .module exists, .exports exists.
			moduleThis = def.cjs ? def.exports : undef;
			resource = def.res.apply(moduleThis, def.deps);
			if (resource === undef && def.exports) {
				// note: exports will equal module.exports unless
				// module.exports was reassigned inside module.
				resource = def.module ? (def.exports = def.module.exports) : def.exports;
			}
			return resource;
		},

		defineResource: function (def, args) {

			def.res = args.res;
			def.cjs = args.cjs;
			def.depNames = args.deps;
			core.getDeps(def);

		},

		getDeps: function (parentDef) {

			var i, names, deps, len, dep, completed, name,
				exportCollector, resolveCollector;

			deps = [];
			names = parentDef.depNames;
			len = names.length;

			if (names.length == 0) allResolved();

			function collect (dep, index, alsoExport) {
				deps[index] = dep;
				if (alsoExport) exportCollector(dep, index);
			}

			// reducer-collectors
			exportCollector = countdown(len, collect, allExportsReady);
			resolveCollector = countdown(len, collect, allResolved);

			// initiate the resolution of all dependencies
			// Note: the correct handling of early exports relies on the
			// fact that the exports pseudo-dependency is always listed
			// before other module dependencies.
			for (i = 0; i < len; i++) {
				name = names[i];
				// is this "require", "exports", or "module"?
				if (name in cjsGetters) {
					// a side-effect of cjsGetters is that the cjs
					// property is also set on the def.
					resolveCollector(cjsGetters[name](parentDef), i, true);
					// if we are using the `module` or `exports` cjs variables,
					// signal any waiters/parents that we can export
					// early (see progress callback in getDep below).
					// note: this may fire for `require` as well, if it
					// is listed after `module` or `exports` in the deps list,
					// but that is okay since all waiters will only record
					// it once.
					if (parentDef.exports) {
						parentDef.progress(msgUsingExports);
					}
				}
				// check for blanks. fixes #32.
				// this helps support yepnope.js, has.js, and the has! plugin
				else if (!name) {
					resolveCollector(undef, i, true);
				}
				// normal module or plugin resource
				else {
					getDep(name, i);
				}
			}

			return parentDef;

			function getDep (name, index) {
				var resolveOnce, exportOnce, childDef, earlyExport;

				resolveOnce = countdown(1, function (dep) {
					exportOnce(dep);
					resolveCollector(dep, index);
				});
				exportOnce = countdown(1, function (dep) {
					exportCollector(dep, index);
				});

				// get child def / dep
				childDef = core.fetchDep(name, parentDef);

				// check if childDef can export. if it can, then
				// we missed the notification and it will never fire in the
				// when() below.
				earlyExport = isPromise(childDef) && childDef.exports;
				if (earlyExport) {
					exportOnce(earlyExport);
				}

				when(childDef,
					resolveOnce,
					parentDef.reject,
					parentDef.exports && function (msg) {
						// messages are only sent from childDefs that support
						// exports, and we only notify parents that understand
						// exports too.
						if (childDef.exports) {
							if (msg == msgUsingExports) {
								// if we're using exports cjs variable on both sides
								exportOnce(childDef.exports);
							}
							else if (msg == msgFactoryExecuted) {
								resolveOnce(childDef.exports);
							}
						}
					}
				);
			}

			function allResolved () {
				parentDef.resolve(deps);
			}

			function allExportsReady () {
				parentDef.exportsReady && parentDef.exportsReady(deps);
			}

		},

		fetchResDef: function (def) {

			// ensure url is computed
			core.getDefUrl(def);

			core.loadScript(def,

				function () {
					var args = argsNet;
					argsNet = undef; // reset it before we get deps

					// if our resource was not explicitly defined with an id (anonymous)
					// Note: if it did have an id, it will be resolved in the define()
					if (def.useNet !== false) {

						// if !args, nothing was added to the argsNet
						if (!args || args.ex) {
							def.reject(new Error(((args && args.ex) || 'define() missing or duplicated: ' + def.url)));
						}
						else {
							core.defineResource(def, args);
						}
					}

				},

				def.reject

			);

			return def;

		},

		fetchDep: function (depName, parentDef) {
			var toAbsId, isPreload, cfg, parts, absId, mainId, loaderId, pluginId,
				resId, pathInfo, def, tempDef, resCfg;

			toAbsId = parentDef.toAbsId;
			isPreload = parentDef.isPreload;
			cfg = parentDef.config || userCfg; // is this fallback necessary?

			absId = toAbsId(depName);

			if (absId in cache) {
				// module already exists in cache
				mainId = absId;
			}
			else {
				// check for plugin loaderId
				parts = pluginParts(absId);
				resId = parts.resourceId;
				// get id of first resource to load (which could be a plugin)
				mainId = parts.pluginId || resId;
				pathInfo = core.resolvePathInfo(mainId, cfg);
			}

			// get custom module loader from package config if not a plugin
			if (parts) {
				if (parts.pluginId) {
					loaderId = mainId;
				}
				else {
					// TODO: move config.moduleLoader to config.transform
					loaderId = pathInfo.config['moduleLoader'] || pathInfo.config.moduleLoader;
					if (loaderId) {
						// TODO: allow transforms to have relative module ids?
						// (we could do this by returning package location from
						// resolvePathInfo. why not return all package info?)
						resId = mainId;
						mainId = loaderId;
						pathInfo = core.resolvePathInfo(loaderId, cfg);
					}
				}
			}

			if (mainId in cache) {
				def = cache[mainId];
			}
			else if (pathInfo.url in urlCache) {
				def = cache[mainId] = urlCache[pathInfo.url];
			}
			else {
				def = core.createResourceDef(pathInfo.config, mainId, isPreload);
				// TODO: can this go inside createResourceDef?
				// TODO: can we pass pathInfo.url to createResourceDef instead?
				def.url = core.checkToAddJsExt(pathInfo.url, pathInfo.config);
				cache[mainId] = urlCache[pathInfo.url] = def;
				core.fetchResDef(def);
			}

			// plugin or transformer
			if (mainId == loaderId) {

				// we need to use an anonymous promise until plugin tells
				// us normalized id. then, we need to consolidate the promises
				// below. Note: exports objects will be different between
				// pre-normalized and post-normalized defs! does this matter?
				// don't put this resource def in the cache because if the
				// resId doesn't change, the check if this is a new
				// normalizedDef (below) will think it's already being loaded.
				tempDef = new Promise();

				// note: this means moduleLoaders can store config info in the
				// plugins config, too.
				resCfg = cfg.plugins[loaderId] || cfg;

				// wait for plugin resource def
				when(def, function(plugin) {
					var normalizedDef, fullId, dynamic;

					dynamic = plugin['dynamic'];
					// check if plugin supports the normalize method
					if ('normalize' in plugin) {
						// note: dojo/has may return falsey values (0, actually)
						resId = plugin['normalize'](resId, toAbsId, def.config) || '';
					}
					else {
						resId = toAbsId(resId);
					}

					// use the full id (loaderId + id) to id plugin resources
					// so multiple plugins may each process the same resource
					// resId could be blank if the plugin doesn't require any (e.g. "domReady!")
					fullId = loaderId + '!' + resId;
					normalizedDef = cache[fullId];

					// if this is our first time fetching this (normalized) def
					if (!(fullId in cache)) {

						// because we're using resId, plugins, such as wire!,
						// can use paths relative to the resource
						normalizedDef = core.createPluginDef(resCfg, fullId, resId, isPreload);

						// don't cache non-determinate "dynamic" resources
						if (!dynamic) {
							cache[fullId] = normalizedDef;
						}

						// curl's plugins prefer to receive a deferred,
						// but to be compatible with AMD spec, we have to
						// piggy-back on the callback function parameter:
						var loaded = function (res) {
							if (!dynamic) cache[fullId] = res;
							normalizedDef.resolve(res);
						};
						loaded['resolve'] = loaded;
						loaded['reject'] = loaded['error'] = normalizedDef.reject;

						// load the resource!
						plugin.load(resId, normalizedDef.require, loaded, resCfg);

					}

					// chain defs (resolve when plugin.load executes)
					if (tempDef != normalizedDef) {
						when(normalizedDef, tempDef.resolve, tempDef.reject, tempDef.progress);
					}

				}, tempDef.reject);

			}

			// return tempDef if this is a plugin-based resource
			return tempDef || def;
		},

		getCurrentDefName: function () {
			// IE6-9 mark the currently executing thread as "interactive"
			// Note: Opera lies about which scripts are "interactive", so we
			// just have to test for it. Opera provides a true browser test, not
			// a UA sniff, thankfully.
			// learned this trick from James Burke's RequireJS
			var def;
			if (!isType(global.opera, 'Opera')) {
				for (var d in activeScripts) {
					if (activeScripts[d].readyState == 'interactive') {
						def = d;
						break;
					}
				}
			}
			return def;
		},

		findScript: function (predicate) {
			var i = 0, scripts, script;
			scripts = doc && (doc.scripts || doc.getElementsByTagName('script'));
			while (scripts && (script = scripts[i++])) {
				if (predicate(script)) return script;
			}
		},

		extractDataAttrConfig: function (cfg) {
			var script;
			script = core.findScript(function (script) {
				var main;
				// find main module(s) in data-curl-run attr on script element
				// TODO: extract baseUrl, too?
				main = script.getAttribute(runModuleAttr);
				if (main) cfg.main = main;
				return main;
			});
			// removeAttribute is wonky (in IE6?) but this works
			if (script) {
				script.setAttribute(runModuleAttr, '');
			}
			return cfg;
		},

		nextTurn: function (task) {
			setTimeout(task, 0);
		}

	};

	// hook-up cjs free variable getters
	cjsGetters = {'require': core.getCjsRequire, 'exports': core.getCjsExports, 'module': core.getCjsModule};

	function _curl (/* various */) {
		var args, promise, cfg;

		args = [].slice.call(arguments);

		// extract config, if it's specified
		if (isType(args[0], 'Object')) {
			cfg = args.shift();
			promise = _config(cfg);
		}

		return new CurlApi(args[0], args[1], args[2], promise);
	}

	function _config (cfg, callback, errback) {
		var pPromise, mPromise, main, devmain, fallback;

		if (cfg) {
			core.setApi(cfg);
			userCfg = core.config(cfg);
			// check for preloads
			if ('preloads' in cfg) {
				pPromise = new CurlApi(cfg['preloads'], undef, errback, preload, true);
				// yes, this is hacky and embarrassing. now that we've got that
				// settled... until curl has deferred factory execution, this
				// is the only way to stop preloads from dead-locking when
				// they have dependencies inside a bundle.
				core.nextTurn(function () { preload = pPromise; });
			}
			// check for main module(s). all modules wait for preloads implicitly.
			main = cfg['main'];
			main = main && String(main).split(splitMainDirectives);
			if (main) {
				mPromise = new Promise();
				mPromise.then(callback, errback);
				// figure out if we are using a dev-time fallback
				fallback = main[1]
					? function () { new CurlApi([main[1]], mPromise.resolve, mPromise.reject); }
					: mPromise.reject;
				new CurlApi([main[0]], mPromise.resolve, fallback);
				return mPromise;
			}
		}
	}

	// thanks to Joop Ringelberg for helping troubleshoot the API
	function CurlApi (ids, callback, errback, waitFor, isPreload) {
		var then, ctx;

		ctx = core.createContext(userCfg, undef, [].concat(ids), isPreload);

		this['then'] = this.then = then = function (resolved, rejected) {
			when(ctx,
				// return the dependencies as arguments, not an array
				function (deps) {
					if (resolved) resolved.apply(undef, deps);
				},
				// just throw if the dev didn't specify an error handler
				function (ex) {
					if (rejected) rejected(ex); else throw ex;
				}
			);
			return this;
		};

		this['next'] = function (ids, cb, eb) {
			// chain api
			return new CurlApi(ids, cb, eb, ctx);
		};

		this['config'] = _config;

		if (callback || errback) then(callback, errback);

		// ensure next-turn so inline code can execute first
		core.nextTurn(function () {
			when(isPreload || preload, function () {
				when(waitFor, function () { core.getDeps(ctx); }, errback);
			});
		});
	}

	_curl['version'] = version;
	_curl['config'] = _config;

	function _define (args) {

		var id, def, pathInfo;

		id = args.id;

		if (id == undef) {
			if (argsNet !== undef) {
				argsNet = { ex: 'Multiple anonymous defines encountered' };
			}
			else if (!(id = core.getCurrentDefName())/* intentional assignment */) {
				// anonymous define(), defer processing until after script loads
				argsNet = args;
			}
		}
		if (id != undef) {
			// named define(), it is in the cache if we are loading a dependency
			// (could also be a secondary define() appearing in a built file, etc.)
			def = cache[id];
			if (!(id in cache)) {
				// id is an absolute id in this case, so we can get the config.
				pathInfo = core.resolvePathInfo(id, userCfg);
				def = core.createResourceDef(pathInfo.config, id);
				cache[id] = def;
			}
			if (!isPromise(def)) throw new Error('duplicate define: ' + id);
			// check if this resource has already been resolved
			def.useNet = false;
			core.defineResource(def, args);
		}

	}

	function define () {
		// wrap inner _define so it can be replaced without losing define.amd
		var args = core.fixArgs(arguments);
		_define(args);
	}

	// indicate our capabilities:
	define['amd'] = { 'plugins': true, 'jQuery': true, 'curl': version };

	// default configs
	userCfg = {
		baseUrl: '',
		pluginPath: 'curl/plugin',
		dontAddFileExt: dontAddExtRx,
		paths: {},
		packages: {},
		plugins: {},
		pathMap: {},
		pathRx: /$^/
	};

	// look for "data-curl-run" directive, and override config
	userCfg = core.extractDataAttrConfig(userCfg);

	// handle pre-existing global
	prevCurl = global[curlName];
	prevDefine = global[defineName];

	// only run config if there is something to config (perf saver?)
	if (prevCurl && isType(prevCurl, 'Object') || userCfg.main) {
		// remove global curl object
		global[curlName] = undef; // can't use delete in IE 6-8
		// configure curl
		_config(prevCurl || userCfg);
	}
	else {
		// set default api
		core.setApi();
	}

	// allow curl to be a dependency
	cache[curlName] = _curl;

	// expose curl core for special plugins and modules
	// Note: core overrides will only work in either of two scenarios:
	// 1. the files are running un-compressed (Google Closure or Uglify)
	// 2. the overriding module was compressed into the same file as curl.js
	// Compiling curl and the overriding module separately won't work.
	cache['curl/_privileged'] = {
		'core': core,
		'cache': cache,
		'config': function () { return userCfg; },
		'_define': _define,
		'_curl': _curl,
		'Promise': Promise
	};

}(this.window || (typeof global != 'undefined' && global) || this));
