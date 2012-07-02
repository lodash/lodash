$(document).ready(function() {

  // Variable to catch the last request.
  var lastRequest = null;
  // Variable to catch ajax params.
  var ajaxParams = null;
  var sync = Backbone.sync;
  var ajax = Backbone.ajax;
  var urlRoot = null;

  var proxy = Backbone.Model.extend();
  var klass = Backbone.Collection.extend({
    url : function() { return '/collection'; }
  });
  var doc, collection;

  module("Backbone.Model", {

    setup: function() {
      doc = new proxy({
        id     : '1-the-tempest',
        title  : "The Tempest",
        author : "Bill Shakespeare",
        length : 123
      });
      collection = new klass();
      collection.add(doc);

      Backbone.sync = function(method, model, options) {
        lastRequest = {
          method: method,
          model: model,
          options: options
        };
        sync.apply(this, arguments);
      };
      Backbone.ajax = function(params) { ajaxParams = params; };
      urlRoot = Backbone.Model.prototype.urlRoot;
      Backbone.Model.prototype.urlRoot = '/';
    },

    teardown: function() {
      Backbone.sync = sync;
      Backbone.ajax = ajax;
      Backbone.Model.prototype.urlRoot = urlRoot;
    }

  });

  test("Model: initialize", 3, function() {
    var Model = Backbone.Model.extend({
      initialize: function() {
        this.one = 1;
        equal(this.collection, collection);
      }
    });
    var model = new Model({}, {collection: collection});
    equal(model.one, 1);
    equal(model.collection, collection);
  });

  test("Model: initialize with attributes and options", 1, function() {
    var Model = Backbone.Model.extend({
      initialize: function(attributes, options) {
        this.one = options.one;
      }
    });
    var model = new Model({}, {one: 1});
    equal(model.one, 1);
  });

  test("Model: initialize with parsed attributes", 1, function() {
    var Model = Backbone.Model.extend({
      parse: function(obj) {
        obj.value += 1;
        return obj;
      }
    });
    var model = new Model({value: 1}, {parse: true});
    equal(model.get('value'), 2);
  });

  test("Model: url", 3, function() {
    doc.urlRoot = null;
    equal(doc.url(), '/collection/1-the-tempest');
    doc.collection.url = '/collection/';
    equal(doc.url(), '/collection/1-the-tempest');
    doc.collection = null;
    raises(function() { doc.url(); });
    doc.collection = collection;
  });

  test("Model: url when using urlRoot, and uri encoding", 2, function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/collection'
    });
    var model = new Model();
    equal(model.url(), '/collection');
    model.set({id: '+1+'});
    equal(model.url(), '/collection/%2B1%2B');
  });

  test("Model: url when using urlRoot as a function to determine urlRoot at runtime", 2, function() {
    var Model = Backbone.Model.extend({
      urlRoot: function() {
        return '/nested/' + this.get('parent_id') + '/collection';
      }
    });

    var model = new Model({parent_id: 1});
    equal(model.url(), '/nested/1/collection');
    model.set({id: 2});
    equal(model.url(), '/nested/1/collection/2');
  });

  test("Model: clone", 8, function() {
    var a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3});
    var b = a.clone();
    equal(a.get('foo'), 1);
    equal(a.get('bar'), 2);
    equal(a.get('baz'), 3);
    equal(b.get('foo'), a.get('foo'), "Foo should be the same on the clone.");
    equal(b.get('bar'), a.get('bar'), "Bar should be the same on the clone.");
    equal(b.get('baz'), a.get('baz'), "Baz should be the same on the clone.");
    a.set({foo : 100});
    equal(a.get('foo'), 100);
    equal(b.get('foo'), 1, "Changing a parent attribute does not change the clone.");
  });

  test("Model: isNew", 6, function() {
    var a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3});
    ok(a.isNew(), "it should be new");
    a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3, 'id': -5 });
    ok(!a.isNew(), "any defined ID is legal, negative or positive");
    a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3, 'id': 0 });
    ok(!a.isNew(), "any defined ID is legal, including zero");
    ok( new Backbone.Model({          }).isNew(), "is true when there is no id");
    ok(!new Backbone.Model({ 'id': 2  }).isNew(), "is false for a positive integer");
    ok(!new Backbone.Model({ 'id': -5 }).isNew(), "is false for a negative integer");
  });

  test("Model: get", 2, function() {
    equal(doc.get('title'), 'The Tempest');
    equal(doc.get('author'), 'Bill Shakespeare');
  });

  test("Model: escape", 5, function() {
    equal(doc.escape('title'), 'The Tempest');
    doc.set({audience: 'Bill & Bob'});
    equal(doc.escape('audience'), 'Bill &amp; Bob');
    doc.set({audience: 'Tim > Joan'});
    equal(doc.escape('audience'), 'Tim &gt; Joan');
    doc.set({audience: 10101});
    equal(doc.escape('audience'), '10101');
    doc.unset('audience');
    equal(doc.escape('audience'), '');
  });

  test("Model: has", 10, function() {
    var model = new Backbone.Model();

    strictEqual(model.has('name'), false);

    model.set({
      '0': 0,
      '1': 1,
      'true': true,
      'false': false,
      'empty': '',
      'name': 'name',
      'null': null,
      'undefined': undefined
    });

    strictEqual(model.has('0'), true);
    strictEqual(model.has('1'), true);
    strictEqual(model.has('true'), true);
    strictEqual(model.has('false'), true);
    strictEqual(model.has('empty'), true);
    strictEqual(model.has('name'), true);

    model.unset('name');

    strictEqual(model.has('name'), false);
    strictEqual(model.has('null'), false);
    strictEqual(model.has('undefined'), false);
  });

  test("Model: set and unset", 8, function() {
    var a = new Backbone.Model({id: 'id', foo: 1, bar: 2, baz: 3});
    var changeCount = 0;
    a.on("change:foo", function() { changeCount += 1; });
    a.set({'foo': 2});
    ok(a.get('foo') == 2, "Foo should have changed.");
    ok(changeCount == 1, "Change count should have incremented.");
    a.set({'foo': 2}); // set with value that is not new shouldn't fire change event
    ok(a.get('foo') == 2, "Foo should NOT have changed, still 2");
    ok(changeCount == 1, "Change count should NOT have incremented.");

    a.validate = function(attrs) {
      equal(attrs.foo, void 0, "don't ignore values when unsetting");
    };
    a.unset('foo');
    equal(a.get('foo'), void 0, "Foo should have changed");
    delete a.validate;
    ok(changeCount == 2, "Change count should have incremented for unset.");

    a.unset('id');
    equal(a.id, undefined, "Unsetting the id should remove the id property.");
  });

  test("Model: multiple unsets", 1, function() {
    var i = 0;
    var counter = function(){ i++; };
    var model = new Backbone.Model({a: 1});
    model.on("change:a", counter);
    model.set({a: 2});
    model.unset('a');
    model.unset('a');
    equal(i, 2, 'Unset does not fire an event for missing attributes.');
  });

  test("Model: unset and changedAttributes", 2, function() {
    var model = new Backbone.Model({a: 1});
    model.unset('a', {silent: true});
    var changedAttributes = model.changedAttributes();
    ok('a' in changedAttributes, 'changedAttributes should contain unset properties');

    changedAttributes = model.changedAttributes();
    ok('a' in changedAttributes, 'changedAttributes should contain unset properties when running changedAttributes again after an unset.');
  });

  test("Model: using a non-default id attribute.", 5, function() {
    var MongoModel = Backbone.Model.extend({idAttribute : '_id'});
    var model = new MongoModel({id: 'eye-dee', _id: 25, title: 'Model'});
    equal(model.get('id'), 'eye-dee');
    equal(model.id, 25);
    equal(model.isNew(), false);
    model.unset('_id');
    equal(model.id, undefined);
    equal(model.isNew(), true);
  });

  test("Model: set an empty string", 1, function() {
    var model = new Backbone.Model({name : "Model"});
    model.set({name : ''});
    equal(model.get('name'), '');
  });

  test("Model: clear", 3, function() {
    var changed;
    var model = new Backbone.Model({id: 1, name : "Model"});
    model.on("change:name", function(){ changed = true; });
    model.on("change", function() {
      var changedAttrs = model.changedAttributes();
      ok('name' in changedAttrs);
    });
    model.clear();
    equal(changed, true);
    equal(model.get('name'), undefined);
  });

  test("Model: defaults", 4, function() {
    var Defaulted = Backbone.Model.extend({
      defaults: {
        "one": 1,
        "two": 2
      }
    });
    var model = new Defaulted({two: null});
    equal(model.get('one'), 1);
    equal(model.get('two'), null);
    Defaulted = Backbone.Model.extend({
      defaults: function() {
        return {
          "one": 3,
          "two": 4
        };
      }
    });
    var model = new Defaulted({two: null});
    equal(model.get('one'), 3);
    equal(model.get('two'), null);
  });

  test("Model: change, hasChanged, changedAttributes, previous, previousAttributes", 12, function() {
    var model = new Backbone.Model({name : "Tim", age : 10});
    equal(model.changedAttributes(), false);
    model.on('change', function() {
      ok(model.hasChanged('name'), 'name changed');
      ok(!model.hasChanged('age'), 'age did not');
      ok(_.isEqual(model.changedAttributes(), {name : 'Rob'}), 'changedAttributes returns the changed attrs');
      equal(model.previous('name'), 'Tim');
      ok(_.isEqual(model.previousAttributes(), {name : "Tim", age : 10}), 'previousAttributes is correct');
    });
    equal(model.hasChanged(), false);
    equal(model.hasChanged(undefined), false);
    model.set({name : 'Rob'}, {silent : true});
    equal(model.hasChanged(), true);
    equal(model.hasChanged(undefined), true);
    equal(model.hasChanged('name'), true);
    model.change();
    equal(model.get('name'), 'Rob');

  });

  test("Model: changedAttributes", 3, function() {
    var model = new Backbone.Model({a: 'a', b: 'b'});
    equal(model.changedAttributes(), false);
    equal(model.changedAttributes({a: 'a'}), false);
    equal(model.changedAttributes({a: 'b'}).a, 'b');
  });

  test("Model: change with options", 2, function() {
    var value;
    var model = new Backbone.Model({name: 'Rob'});
    model.on('change', function(model, options) {
      value = options.prefix + model.get('name');
    });
    model.set({name: 'Bob'}, {silent: true});
    model.change({prefix: 'Mr. '});
    equal(value, 'Mr. Bob');
    model.set({name: 'Sue'}, {prefix: 'Ms. '});
    equal(value, 'Ms. Sue');
  });

  test("Model: change after initialize", 1, function () {
    var changed = 0;
    var attrs = {id: 1, label: 'c'};
    var obj = new Backbone.Model(attrs);
    obj.on('change', function() { changed += 1; });
    obj.set(attrs);
    equal(changed, 0);
  });

  test("Model: save within change event", 1, function () {
    var model = new Backbone.Model({firstName : "Taylor", lastName: "Swift"});
    model.on('change', function () {
      model.save();
      ok(_.isEqual(lastRequest.model, model));
    });
    model.set({lastName: 'Hicks'});
  });

  test("Model: validate after save", 1, function() {
    var lastError, model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.sync = function(method, model, options) {
      options.success.call(this, {admin: true});
    };
    model.save(null, {error: function(model, error) {
      lastError = error;
    }});

    equal(lastError, "Can't change admin status.");
  });

  test("Model: isValid", 5, function() {
    var model = new Backbone.Model({valid: true});
    model.validate = function(attrs) {
      if (!attrs.valid) return "invalid";
    };
    equal(model.isValid(), true);
    equal(model.set({valid: false}), false);
    equal(model.isValid(), true);
    ok(model.set('valid', false, {silent: true}));
    equal(model.isValid(), false);
  });

  test("Model: save", 2, function() {
    doc.save({title : "Henry V"});
    equal(lastRequest.method, 'update');
    ok(_.isEqual(lastRequest.model, doc));
  });

  test("Model: save in positional style", 1, function() {
    var model = new Backbone.Model();
    model.sync = function(method, model, options) {
      options.success();
    };
    model.save('title', 'Twelfth Night');
    equal(model.get('title'), 'Twelfth Night');
  });



  test("Model: fetch", 2, function() {
    doc.fetch();
    equal(lastRequest.method, 'read');
    ok(_.isEqual(lastRequest.model, doc));
  });

  test("Model: destroy", 3, function() {
    doc.destroy();
    equal(lastRequest.method, 'delete');
    ok(_.isEqual(lastRequest.model, doc));

    var newModel = new Backbone.Model;
    equal(newModel.destroy(), false);
  });

  test("Model: non-persisted destroy", 1, function() {
    var a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3});
    a.sync = function() { throw "should not be called"; };
    a.destroy();
    ok(true, "non-persisted model should not call sync");
  });

  test("Model: validate", 7, function() {
    var lastError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin != this.get('admin')) return "Can't change admin status.";
    };
    model.on('error', function(model, error) {
      lastError = error;
    });
    var result = model.set({a: 100});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(lastError, undefined);
    result = model.set({admin: true}, {silent: true});
    equal(model.get('admin'), true);
    result = model.set({a: 200, admin: false});
    equal(lastError, "Can't change admin status.");
    equal(result, false);
    equal(model.get('a'), 100);
  });

  test("Model: validate on unset and clear", 6, function() {
    var error;
    var model = new Backbone.Model({name: "One"});
    model.validate = function(attrs) {
      if (!attrs.name) {
        error = true;
        return "No thanks.";
      }
    };
    model.set({name: "Two"});
    equal(model.get('name'), 'Two');
    equal(error, undefined);
    model.unset('name');
    equal(error, true);
    equal(model.get('name'), 'Two');
    model.clear();
    equal(model.get('name'), 'Two');
    delete model.validate;
    model.clear();
    equal(model.get('name'), undefined);
  });

  test("Model: validate with error callback", 8, function() {
    var lastError, boundError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    var callback = function(model, error) {
      lastError = error;
    };
    model.on('error', function(model, error) {
      boundError = true;
    });
    var result = model.set({a: 100}, {error: callback});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(lastError, undefined);
    equal(boundError, undefined);
    result = model.set({a: 200, admin: true}, {error: callback});
    equal(result, false);
    equal(model.get('a'), 100);
    equal(lastError, "Can't change admin status.");
    equal(boundError, undefined);
  });

  test("Model: defaults always extend attrs (#459)", 2, function() {
    var Defaulted = Backbone.Model.extend({
      defaults: {one: 1},
      initialize : function(attrs, opts) {
        equal(this.attributes.one, 1);
      }
    });
    var providedattrs = new Defaulted({});
    var emptyattrs = new Defaulted();
  });

  test("Model: Inherit class properties", 6, function() {
    var Parent = Backbone.Model.extend({
      instancePropSame: function() {},
      instancePropDiff: function() {}
    }, {
      classProp: function() {}
    });
    var Child = Parent.extend({
      instancePropDiff: function() {}
    });

    var adult = new Parent;
    var kid   = new Child;

    equal(Child.classProp, Parent.classProp);
    notEqual(Child.classProp, undefined);

    equal(kid.instancePropSame, adult.instancePropSame);
    notEqual(kid.instancePropSame, undefined);

    notEqual(Child.prototype.instancePropDiff, Parent.prototype.instancePropDiff);
    notEqual(Child.prototype.instancePropDiff, undefined);
  });

  test("Model: Nested change events don't clobber previous attributes", 4, function() {
    new Backbone.Model()
    .on('change:state', function(model, newState) {
      equal(model.previous('state'), undefined);
      equal(newState, 'hello');
      // Fire a nested change event.
      model.set({other: 'whatever'});
    })
    .on('change:state', function(model, newState) {
      equal(model.previous('state'), undefined);
      equal(newState, 'hello');
    })
    .set({state: 'hello'});
  });

  test("hasChanged/set should use same comparison", 2, function() {
    var changed = 0, model = new Backbone.Model({a: null});
    model.on('change', function() {
      ok(this.hasChanged('a'));
    })
    .on('change:a', function() {
      changed++;
    })
    .set({a: undefined});
    equal(changed, 1);
  });

  test("#582, #425, change:attribute callbacks should fire after all changes have occurred", 9, function() {
    var model = new Backbone.Model;

    var assertion = function() {
      equal(model.get('a'), 'a');
      equal(model.get('b'), 'b');
      equal(model.get('c'), 'c');
    };

    model.on('change:a', assertion);
    model.on('change:b', assertion);
    model.on('change:c', assertion);

    model.set({a: 'a', b: 'b', c: 'c'});
  });

  test("#871, set with attributes property", 1, function() {
    var model = new Backbone.Model();
    model.set({attributes: true});
    ok(model.has('attributes'));
  });

  test("set value regardless of equality/change", 1, function() {
    var model = new Backbone.Model({x: []});
    var a = [];
    model.set({x: a});
    ok(model.get('x') === a);
  });

  test("unset fires change for undefined attributes", 1, function() {
    var model = new Backbone.Model({x: undefined});
    model.on('change:x', function(){ ok(true); });
    model.unset('x');
  });

  test("set: undefined values", 1, function() {
    var model = new Backbone.Model({x: undefined});
    ok('x' in model.attributes);
  });

  test("change fires change:attr", 1, function() {
    var model = new Backbone.Model({x: 1});
    model.set({x: 2}, {silent: true});
    model.on('change:x', function(){ ok(true); });
    model.change();
  });

  test("hasChanged is false after original values are set", 2, function() {
    var model = new Backbone.Model({x: 1});
    model.on('change:x', function(){ ok(false); });
    model.set({x: 2}, {silent: true});
    ok(model.hasChanged());
    model.set({x: 1}, {silent: true});
    ok(!model.hasChanged());
  });

  test("save with `wait` succeeds without `validate`", 1, function() {
    var model = new Backbone.Model();
    model.save({x: 1}, {wait: true});
    ok(lastRequest.model === model);
  });

  test("`hasChanged` for falsey keys", 2, function() {
    var model = new Backbone.Model();
    model.set({x: true}, {silent: true});
    ok(!model.hasChanged(0));
    ok(!model.hasChanged(''));
  });

  test("`previous` for falsey keys", 2, function() {
    var model = new Backbone.Model({0: true, '': true});
    model.set({0: false, '': false}, {silent: true});
    equal(model.previous(0), true);
    equal(model.previous(''), true);
  });

  test("`save` with `wait` sends correct attributes", 5, function() {
    var changed = 0;
    var model = new Backbone.Model({x: 1, y: 2});
    model.on('change:x', function() { changed++; });
    model.save({x: 3}, {wait: true});
    deepEqual(JSON.parse(ajaxParams.data), {x: 3, y: 2});
    equal(model.get('x'), 1);
    equal(changed, 0);
    lastRequest.options.success({});
    equal(model.get('x'), 3);
    equal(changed, 1);
  });

  test("a failed `save` with `wait` doesn't leave attributes behind", 1, function() {
    var model = new Backbone.Model;
    model.save({x: 1}, {wait: true});
    equal(model.get('x'), void 0);
  });

  test("#1030 - `save` with `wait` results in correct attributes if success is called during sync", 2, function() {
    var model = new Backbone.Model({x: 1, y: 2});
    model.sync = function(method, model, options) {
      options.success();
    };
    model.on("change:x", function() { ok(true); });
    model.save({x: 3}, {wait: true});
    equal(model.get('x'), 3);
  });

  test("save with wait validates attributes", 1, function() {
    var model = new Backbone.Model();
    model.validate = function() { ok(true); };
    model.save({x: 1}, {wait: true});
  });

  test("nested `set` during `'change:attr'`", 2, function() {
    var events = [];
    var model = new Backbone.Model();
    model.on('all', function(event) { events.push(event); });
    model.on('change', function() {
      model.set({z: true}, {silent:true});
    });
    model.on('change:x', function() {
      model.set({y: true});
    });
    model.set({x: true});
    deepEqual(events, ['change:y', 'change:x', 'change']);
    events = [];
    model.change();
    deepEqual(events, ['change:z', 'change']);
  });

  test("nested `change` only fires once", 1, function() {
    var model = new Backbone.Model();
    model.on('change', function() {
      ok(true);
      model.change();
    });
    model.set({x: true});
  });

  test("no `'change'` event if no changes", 0, function() {
    var model = new Backbone.Model();
    model.on('change', function() { ok(false); });
    model.change();
  });

  test("nested `set` during `'change'`", 6, function() {
    var count = 0;
    var model = new Backbone.Model();
    model.on('change', function() {
      switch(count++) {
        case 0:
          deepEqual(this.changedAttributes(), {x: true});
          equal(model.previous('x'), undefined);
          model.set({y: true});
          break;
        case 1:
          deepEqual(this.changedAttributes(), {y: true});
          equal(model.previous('x'), true);
          model.set({z: true});
          break;
        case 2:
          deepEqual(this.changedAttributes(), {z: true});
          equal(model.previous('y'), true);
          break;
        default:
          ok(false);
      }
    });
    model.set({x: true});
  });

  test("nested `'change'` with silent", 3, function() {
    var count = 0;
    var model = new Backbone.Model();
    model.on('change:y', function() { ok(true); });
    model.on('change', function() {
      switch(count++) {
        case 0:
          deepEqual(this.changedAttributes(), {x: true});
          model.set({y: true}, {silent: true});
          break;
        case 1:
          deepEqual(this.changedAttributes(), {y: true, z: true});
          break;
        default:
          ok(false);
      }
    });
    model.set({x: true});
    model.set({z: true});
  });

  test("nested `'change:attr'` with silent", 1, function() {
    var model = new Backbone.Model();
    model.on('change:y', function(){ ok(true); });
    model.on('change', function() {
      model.set({y: true}, {silent: true});
      model.set({z: true});
    });
    model.set({x: true});
  });

  test("multiple nested changes with silent", 1, function() {
    var model = new Backbone.Model();
    model.on('change:x', function() {
      model.set({y: 1}, {silent: true});
      model.set({y: 2});
    });
    model.on('change:y', function(model, val) {
      equal(val, 2);
    });
    model.set({x: true});
    model.change();
  });

  test("multiple nested changes with silent", 2, function() {
    var changes = [];
    var model = new Backbone.Model();
    model.on('change:b', function(model, val) { changes.push(val); });
    model.on('change', function() {
      model.set({b: 1});
      model.set({b: 2}, {silent: true});
    });
    model.set({b: 0});
    deepEqual(changes, [0, 1, 1]);
    model.change();
    deepEqual(changes, [0, 1, 1, 2, 1]);
  });

  test("nested set multiple times", 1, function() {
    var model = new Backbone.Model();
    model.on('change:b', function() {
      ok(true);
    });
    model.on('change:a', function() {
      model.set({b: true});
      model.set({b: true});
    });
    model.set({a: true});
  });

  test("Backbone.wrapError triggers `'error'`", 12, function() {
    var resp = {};
    var options = {};
    var model = new Backbone.Model();
    model.on('error', error);
    var callback = Backbone.wrapError(null, model, options);
    callback(model, resp);
    callback(resp);
    callback = Backbone.wrapError(error, model, options);
    callback(model, resp);
    callback(resp);
    function error(_model, _resp, _options) {
      ok(model === _model);
      ok(resp === _resp);
      ok(options === _options);
    }
  });

  test("#1179 - isValid returns true in the absence of validate.", 1, function() {
    var model = new Backbone.Model();
    model.validate = null;
    ok(model.isValid());
  });

  test("#1122 - clear does not alter options.", 1, function() {
    var model = new Backbone.Model();
    var options = {};
    model.clear(options);
    ok(!options.unset);
  });

  test("#1122 - unset does not alter options.", 1, function() {
    var model = new Backbone.Model();
    var options = {};
    model.unset('x', options);
    ok(!options.unset);
  });

  test("#1355 - `options` is passed to success callbacks", 3, function() {
    var model = new Backbone.Model();
    var opts = {
      success: function( model, resp, options ) {
        ok(options);
      }
    };
    model.sync = function(method, model, options) {
      options.success();
    };
    model.save({id: 1}, opts);
    model.fetch(opts);
    model.destroy(opts);
  });

  test("#1412 - Trigger 'sync' event.", 3, function() {
    var model = new Backbone.Model({id: 1});
    model.sync = function(method, model, options) { options.success(); };
    model.on('sync', function() { ok(true); });
    model.fetch();
    model.save();
    model.destroy();
  });

  test("#1365 - Destroy: New models execute success callback.", 2, function() {
    new Backbone.Model()
    .on('sync', function() { ok(false); })
    .on('destroy', function(){ ok(true); })
    .destroy({ success: function(){ ok(true); }});
  });

  test("#1433 - Save: An invalid model cannot be persisted.", 1, function() {
    var model = new Backbone.Model;
    model.validate = function(){ return 'invalid'; };
    model.sync = function(){ ok(false); };
    strictEqual(model.save(), false);
  });

});
