(function() {

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
    }

  });

  test("initialize", 3, function() {
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

  test("initialize with attributes and options", 1, function() {
    var Model = Backbone.Model.extend({
      initialize: function(attributes, options) {
        this.one = options.one;
      }
    });
    var model = new Model({}, {one: 1});
    equal(model.one, 1);
  });

  test("initialize with parsed attributes", 1, function() {
    var Model = Backbone.Model.extend({
      parse: function(attrs) {
        attrs.value += 1;
        return attrs;
      }
    });
    var model = new Model({value: 1}, {parse: true});
    equal(model.get('value'), 2);
  });

  test("initialize with defaults", 2, function() {
    var Model = Backbone.Model.extend({
      defaults: {
        first_name: 'Unknown',
        last_name: 'Unknown'
      }
    });
    var model = new Model({'first_name': 'John'});
    equal(model.get('first_name'), 'John');
    equal(model.get('last_name'), 'Unknown');
  });

  test("parse can return null", 1, function() {
    var Model = Backbone.Model.extend({
      parse: function(attrs) {
        attrs.value += 1;
        return null;
      }
    });
    var model = new Model({value: 1}, {parse: true});
    equal(JSON.stringify(model.toJSON()), "{}");
  });

  test("url", 3, function() {
    doc.urlRoot = null;
    equal(doc.url(), '/collection/1-the-tempest');
    doc.collection.url = '/collection/';
    equal(doc.url(), '/collection/1-the-tempest');
    doc.collection = null;
    throws(function() { doc.url(); });
    doc.collection = collection;
  });

  test("url when using urlRoot, and uri encoding", 2, function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/collection'
    });
    var model = new Model();
    equal(model.url(), '/collection');
    model.set({id: '+1+'});
    equal(model.url(), '/collection/%2B1%2B');
  });

  test("url when using urlRoot as a function to determine urlRoot at runtime", 2, function() {
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

  test("underscore methods", 5, function() {
    var model = new Backbone.Model({ 'foo': 'a', 'bar': 'b', 'baz': 'c' });
    var model2 = model.clone();
    deepEqual(model.keys(), ['foo', 'bar', 'baz']);
    deepEqual(model.values(), ['a', 'b', 'c']);
    deepEqual(model.invert(), { 'a': 'foo', 'b': 'bar', 'c': 'baz' });
    deepEqual(model.pick('foo', 'baz'), {'foo': 'a', 'baz': 'c'});
    deepEqual(model.omit('foo', 'bar'), {'baz': 'c'});
  });

  test("chain", function() {
    var model = new Backbone.Model({ a: 0, b: 1, c: 2 });
    deepEqual(model.chain().pick("a", "b", "c").values().compact().value(), [1, 2]);
  });

  test("clone", 10, function() {
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

    var foo = new Backbone.Model({p: 1});
    var bar = new Backbone.Model({p: 2});
    bar.set(foo.clone().attributes, {unset: true});
    equal(foo.get('p'), 1);
    equal(bar.get('p'), undefined);
  });

  test("isNew", 6, function() {
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

  test("get", 2, function() {
    equal(doc.get('title'), 'The Tempest');
    equal(doc.get('author'), 'Bill Shakespeare');
  });

  test("escape", 5, function() {
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

  test("has", 10, function() {
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

  test("matches", 4, function() {
    var model = new Backbone.Model();

    strictEqual(model.matches({'name': 'Jonas', 'cool': true}), false);

    model.set({name: 'Jonas', 'cool': true});

    strictEqual(model.matches({'name': 'Jonas'}), true);
    strictEqual(model.matches({'name': 'Jonas', 'cool': true}), true);
    strictEqual(model.matches({'name': 'Jonas', 'cool': false}), false);
  });

  test("matches with predicate", function() {
    var model = new Backbone.Model({a: 0});

    strictEqual(model.matches(function(attr) {
      return attr.a > 1 && attr.b != null;
    }), false);

    model.set({a: 3, b: true});

    strictEqual(model.matches(function(attr) {
      return attr.a > 1 && attr.b != null;
    }), true);
  })

  test("set and unset", 8, function() {
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
      equal(attrs.foo, void 0, "validate:true passed while unsetting");
    };
    a.unset('foo', {validate: true});
    equal(a.get('foo'), void 0, "Foo should have changed");
    delete a.validate;
    ok(changeCount == 2, "Change count should have incremented for unset.");

    a.unset('id');
    equal(a.id, undefined, "Unsetting the id should remove the id property.");
  });

  test("#2030 - set with failed validate, followed by another set triggers change", function () {
    var attr = 0, main = 0, error = 0;
    var Model = Backbone.Model.extend({
      validate: function (attr) {
        if (attr.x > 1) {
          error++;
          return "this is an error";
        }
      }
    });
    var model = new Model({x:0});
      model.on('change:x', function () { attr++; });
      model.on('change', function () { main++; });
      model.set({x:2}, {validate:true});
      model.set({x:1}, {validate:true});
      deepEqual([attr, main, error], [1, 1, 1]);
  });

  test("set triggers changes in the correct order", function() {
    var value = null;
    var model = new Backbone.Model;
    model.on('last', function(){ value = 'last'; });
    model.on('first', function(){ value = 'first'; });
    model.trigger('first');
    model.trigger('last');
    equal(value, 'last');
  });

  test("set falsy values in the correct order", 2, function() {
    var model = new Backbone.Model({result: 'result'});
    model.on('change', function() {
      equal(model.changed.result, void 0);
      equal(model.previous('result'), false);
    });
    model.set({result: void 0}, {silent: true});
    model.set({result: null}, {silent: true});
    model.set({result: false}, {silent: true});
    model.set({result: void 0});
  });

  test("nested set triggers with the correct options", function() {
    var model = new Backbone.Model();
    var o1 = {};
    var o2 = {};
    var o3 = {};
    model.on('change', function(__, options) {
      switch (model.get('a')) {
      case 1:
        equal(options, o1);
        return model.set('a', 2, o2);
      case 2:
        equal(options, o2);
        return model.set('a', 3, o3);
      case 3:
        equal(options, o3);
      }
    });
    model.set('a', 1, o1);
  });

  test("multiple unsets", 1, function() {
    var i = 0;
    var counter = function(){ i++; };
    var model = new Backbone.Model({a: 1});
    model.on("change:a", counter);
    model.set({a: 2});
    model.unset('a');
    model.unset('a');
    equal(i, 2, 'Unset does not fire an event for missing attributes.');
  });

  test("unset and changedAttributes", 1, function() {
    var model = new Backbone.Model({a: 1});
    model.on('change', function() {
      ok('a' in model.changedAttributes(), 'changedAttributes should contain unset properties');
    });
    model.unset('a');
  });

  test("using a non-default id attribute.", 5, function() {
    var MongoModel = Backbone.Model.extend({idAttribute : '_id'});
    var model = new MongoModel({id: 'eye-dee', _id: 25, title: 'Model'});
    equal(model.get('id'), 'eye-dee');
    equal(model.id, 25);
    equal(model.isNew(), false);
    model.unset('_id');
    equal(model.id, undefined);
    equal(model.isNew(), true);
  });

  test("setting an alternative cid prefix", 4, function() {
    var Model = Backbone.Model.extend({
      cidPrefix: 'm'
    });
    var model = new Model();

    equal(model.cid.charAt(0), 'm');

    model = new Backbone.Model();
    equal(model.cid.charAt(0), 'c');

    var Collection = Backbone.Collection.extend({
      model: Model
    });
    var collection = new Collection([{id: 'c5'}, {id: 'c6'}, {id: 'c7'}]);

    equal(collection.get('c6').cid.charAt(0), 'm');
    collection.set([{id: 'c6', value: 'test'}], {
      merge: true,
      add: true,
      remove: false
    });
    ok(collection.get('c6').has('value'));
  });

  test("set an empty string", 1, function() {
    var model = new Backbone.Model({name : "Model"});
    model.set({name : ''});
    equal(model.get('name'), '');
  });

  test("setting an object", 1, function() {
    var model = new Backbone.Model({
      custom: { foo: 1 }
    });
    model.on('change', function() {
      ok(1);
    });
    model.set({
      custom: { foo: 1 } // no change should be fired
    });
    model.set({
      custom: { foo: 2 } // change event should be fired
    });
  });

  test("clear", 3, function() {
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

  test("defaults", 4, function() {
    var Defaulted = Backbone.Model.extend({
      defaults: {
        "one": 1,
        "two": 2
      }
    });
    var model = new Defaulted({two: undefined});
    equal(model.get('one'), 1);
    equal(model.get('two'), 2);
    Defaulted = Backbone.Model.extend({
      defaults: function() {
        return {
          "one": 3,
          "two": 4
        };
      }
    });
    model = new Defaulted({two: undefined});
    equal(model.get('one'), 3);
    equal(model.get('two'), 4);
  });

  test("change, hasChanged, changedAttributes, previous, previousAttributes", 9, function() {
    var model = new Backbone.Model({name: "Tim", age: 10});
    deepEqual(model.changedAttributes(), false);
    model.on('change', function() {
      ok(model.hasChanged('name'), 'name changed');
      ok(!model.hasChanged('age'), 'age did not');
      ok(_.isEqual(model.changedAttributes(), {name : 'Rob'}), 'changedAttributes returns the changed attrs');
      equal(model.previous('name'), 'Tim');
      ok(_.isEqual(model.previousAttributes(), {name : "Tim", age : 10}), 'previousAttributes is correct');
    });
    equal(model.hasChanged(), false);
    equal(model.hasChanged(undefined), false);
    model.set({name : 'Rob'});
    equal(model.get('name'), 'Rob');
  });

  test("changedAttributes", 3, function() {
    var model = new Backbone.Model({a: 'a', b: 'b'});
    deepEqual(model.changedAttributes(), false);
    equal(model.changedAttributes({a: 'a'}), false);
    equal(model.changedAttributes({a: 'b'}).a, 'b');
  });

  test("change with options", 2, function() {
    var value;
    var model = new Backbone.Model({name: 'Rob'});
    model.on('change', function(model, options) {
      value = options.prefix + model.get('name');
    });
    model.set({name: 'Bob'}, {prefix: 'Mr. '});
    equal(value, 'Mr. Bob');
    model.set({name: 'Sue'}, {prefix: 'Ms. '});
    equal(value, 'Ms. Sue');
  });

  test("change after initialize", 1, function () {
    var changed = 0;
    var attrs = {id: 1, label: 'c'};
    var obj = new Backbone.Model(attrs);
    obj.on('change', function() { changed += 1; });
    obj.set(attrs);
    equal(changed, 0);
  });

  test("save within change event", 1, function () {
    var env = this;
    var model = new Backbone.Model({firstName : "Taylor", lastName: "Swift"});
    model.url = '/test';
    model.on('change', function () {
      model.save();
      ok(_.isEqual(env.syncArgs.model, model));
    });
    model.set({lastName: 'Hicks'});
  });

  test("validate after save", 2, function() {
    var lastError, model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.sync = function(method, model, options) {
      options.success.call(this, {admin: true});
    };
    model.on('invalid', function(model, error) {
      lastError = error;
    });
    model.save(null);

    equal(lastError, "Can't change admin status.");
    equal(model.validationError, "Can't change admin status.");
  });

  test("save", 2, function() {
    doc.save({title : "Henry V"});
    equal(this.syncArgs.method, 'update');
    ok(_.isEqual(this.syncArgs.model, doc));
  });

  test("save, fetch, destroy triggers error event when an error occurs", 3, function () {
    var model = new Backbone.Model();
    model.on('error', function () {
      ok(true);
    });
    model.sync = function (method, model, options) {
      options.error();
    };
    model.save({data: 2, id: 1});
    model.fetch();
    model.destroy();
  });

  test("#3283 - save, fetch, destroy calls success with context", 3, function () {
    var model = new Backbone.Model();
    var obj = {};
    var options = {
      context: obj,
      success: function() {
        equal(this, obj);
      }
    };
    model.sync = function (method, model, options) {
      options.success.call(options.context);
    };
    model.save({data: 2, id: 1}, options);
    model.fetch(options);
    model.destroy(options);
  });

  test("#3283 - save, fetch, destroy calls error with context", 3, function () {
    var model = new Backbone.Model();
    var obj = {};
    var options = {
      context: obj,
      error: function() {
        equal(this, obj);
      }
    };
    model.sync = function (method, model, options) {
      options.error.call(options.context);
    };
    model.save({data: 2, id: 1}, options);
    model.fetch(options);
    model.destroy(options);
  });

  test("#3470 - save and fetch with parse false", 2, function() {
    var i = 0;
    var model = new Backbone.Model();
    model.parse = function() {
      ok(false);
    };
    model.sync = function(method, model, options) {
      options.success({i: ++i});
    };
    model.fetch({parse: false});
    equal(model.get('i'), i);
    model.save(null, {parse: false});
    equal(model.get('i'), i);
  });

  test("save with PATCH", function() {
    doc.clear().set({id: 1, a: 1, b: 2, c: 3, d: 4});
    doc.save();
    equal(this.syncArgs.method, 'update');
    equal(this.syncArgs.options.attrs, undefined);

    doc.save({b: 2, d: 4}, {patch: true});
    equal(this.syncArgs.method, 'patch');
    equal(_.size(this.syncArgs.options.attrs), 2);
    equal(this.syncArgs.options.attrs.d, 4);
    equal(this.syncArgs.options.attrs.a, undefined);
    equal(this.ajaxSettings.data, "{\"b\":2,\"d\":4}");
  });

  test("save with PATCH and different attrs", function() {
    doc.clear().save({b: 2, d: 4}, {patch: true, attrs: {B: 1, D: 3}});
    equal(this.syncArgs.options.attrs.D, 3);
    equal(this.syncArgs.options.attrs.d, undefined);
    equal(this.ajaxSettings.data, "{\"B\":1,\"D\":3}");
    deepEqual(doc.attributes, {b: 2, d: 4});
  });

  test("save in positional style", 1, function() {
    var model = new Backbone.Model();
    model.sync = function(method, model, options) {
      options.success();
    };
    model.save('title', 'Twelfth Night');
    equal(model.get('title'), 'Twelfth Night');
  });

  test("save with non-object success response", 2, function () {
    var model = new Backbone.Model();
    model.sync = function(method, model, options) {
      options.success('', options);
      options.success(null, options);
    };
    model.save({testing:'empty'}, {
      success: function (model) {
        deepEqual(model.attributes, {testing:'empty'});
      }
    });
  });

  test("save with wait and supplied id", function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/collection'
    });
    var model = new Model();
    model.save({id: 42}, {wait: true});
    equal(this.ajaxSettings.url, '/collection/42');
  });

  test("save will pass extra options to success callback", 1, function () {
    var SpecialSyncModel = Backbone.Model.extend({
      sync: function (method, model, options) {
        _.extend(options, { specialSync: true });
        return Backbone.Model.prototype.sync.call(this, method, model, options);
      },
      urlRoot: '/test'
    });

    var model = new SpecialSyncModel();

    var onSuccess = function (model, response, options) {
      ok(options.specialSync, "Options were passed correctly to callback");
    };

    model.save(null, { success: onSuccess });
    this.ajaxSettings.success();
  });

  test("fetch", 2, function() {
    doc.fetch();
    equal(this.syncArgs.method, 'read');
    ok(_.isEqual(this.syncArgs.model, doc));
  });

  test("fetch will pass extra options to success callback", 1, function () {
    var SpecialSyncModel = Backbone.Model.extend({
      sync: function (method, model, options) {
        _.extend(options, { specialSync: true });
        return Backbone.Model.prototype.sync.call(this, method, model, options);
      },
      urlRoot: '/test'
    });

    var model = new SpecialSyncModel();

    var onSuccess = function (model, response, options) {
      ok(options.specialSync, "Options were passed correctly to callback");
    };

    model.fetch({ success: onSuccess });
    this.ajaxSettings.success();
  });

  test("destroy", 3, function() {
    doc.destroy();
    equal(this.syncArgs.method, 'delete');
    ok(_.isEqual(this.syncArgs.model, doc));

    var newModel = new Backbone.Model;
    equal(newModel.destroy(), false);
  });

  test("destroy will pass extra options to success callback", 1, function () {
    var SpecialSyncModel = Backbone.Model.extend({
      sync: function (method, model, options) {
        _.extend(options, { specialSync: true });
        return Backbone.Model.prototype.sync.call(this, method, model, options);
      },
      urlRoot: '/test'
    });

    var model = new SpecialSyncModel({ id: 'id' });

    var onSuccess = function (model, response, options) {
      ok(options.specialSync, "Options were passed correctly to callback");
    };

    model.destroy({ success: onSuccess });
    this.ajaxSettings.success();
  });

  test("non-persisted destroy", 1, function() {
    var a = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3});
    a.sync = function() { throw "should not be called"; };
    a.destroy();
    ok(true, "non-persisted model should not call sync");
  });

  test("validate", function() {
    var lastError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin != this.get('admin')) return "Can't change admin status.";
    };
    model.on('invalid', function(model, error) {
      lastError = error;
    });
    var result = model.set({a: 100});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(lastError, undefined);
    result = model.set({admin: true});
    equal(model.get('admin'), true);
    result = model.set({a: 200, admin: false}, {validate:true});
    equal(lastError, "Can't change admin status.");
    equal(result, false);
    equal(model.get('a'), 100);
  });

  test("validate on unset and clear", 6, function() {
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
    model.unset('name', {validate: true});
    equal(error, true);
    equal(model.get('name'), 'Two');
    model.clear({validate:true});
    equal(model.get('name'), 'Two');
    delete model.validate;
    model.clear();
    equal(model.get('name'), undefined);
  });

  test("validate with error callback", 8, function() {
    var lastError, boundError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.on('invalid', function(model, error) {
      boundError = true;
    });
    var result = model.set({a: 100}, {validate:true});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(model.validationError, null);
    equal(boundError, undefined);
    result = model.set({a: 200, admin: true}, {validate:true});
    equal(result, false);
    equal(model.get('a'), 100);
    equal(model.validationError, "Can't change admin status.");
    equal(boundError, true);
  });

  test("defaults always extend attrs (#459)", 2, function() {
    var Defaulted = Backbone.Model.extend({
      defaults: {one: 1},
      initialize : function(attrs, opts) {
        equal(this.attributes.one, 1);
      }
    });
    var providedattrs = new Defaulted({});
    var emptyattrs = new Defaulted();
  });

  test("Inherit class properties", 6, function() {
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

  test("Nested change events don't clobber previous attributes", 4, function() {
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

  test("set same value does not trigger change", 0, function() {
    var model = new Backbone.Model({x: 1});
    model.on('change change:x', function() { ok(false); });
    model.set({x: 1});
    model.set({x: 1});
  });

  test("unset does not fire a change for undefined attributes", 0, function() {
    var model = new Backbone.Model({x: undefined});
    model.on('change:x', function(){ ok(false); });
    model.unset('x');
  });

  test("set: undefined values", 1, function() {
    var model = new Backbone.Model({x: undefined});
    ok('x' in model.attributes);
  });

  test("hasChanged works outside of change events, and true within", 6, function() {
    var model = new Backbone.Model({x: 1});
    model.on('change:x', function() {
      ok(model.hasChanged('x'));
      equal(model.get('x'), 1);
    });
    model.set({x: 2}, {silent: true});
    ok(model.hasChanged());
    equal(model.hasChanged('x'), true);
    model.set({x: 1});
    ok(model.hasChanged());
    equal(model.hasChanged('x'), true);
  });

  test("hasChanged gets cleared on the following set", 4, function() {
    var model = new Backbone.Model;
    model.set({x: 1});
    ok(model.hasChanged());
    model.set({x: 1});
    ok(!model.hasChanged());
    model.set({x: 2});
    ok(model.hasChanged());
    model.set({});
    ok(!model.hasChanged());
  });

  test("save with `wait` succeeds without `validate`", 1, function() {
    var model = new Backbone.Model();
    model.url = '/test';
    model.save({x: 1}, {wait: true});
    ok(this.syncArgs.model === model);
  });

  test("save without `wait` doesn't set invalid attributes", function () {
    var model = new Backbone.Model();
    model.validate = function () { return 1; }
    model.save({a: 1});
    equal(model.get('a'), void 0);
  });

  test("save doesn't validate twice", function () {
    var model = new Backbone.Model();
    var times = 0;
    model.sync = function () {};
    model.validate = function () { ++times; }
    model.save({});
    equal(times, 1);
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
    model.url = '/test';
    model.on('change:x', function() { changed++; });
    model.save({x: 3}, {wait: true});
    deepEqual(JSON.parse(this.ajaxSettings.data), {x: 3, y: 2});
    equal(model.get('x'), 1);
    equal(changed, 0);
    this.syncArgs.options.success({});
    equal(model.get('x'), 3);
    equal(changed, 1);
  });

  test("a failed `save` with `wait` doesn't leave attributes behind", 1, function() {
    var model = new Backbone.Model;
    model.url = '/test';
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

  test("save with wait validates attributes", function() {
    var model = new Backbone.Model();
    model.url = '/test';
    model.validate = function() { ok(true); };
    model.save({x: 1}, {wait: true});
  });

  test("save turns on parse flag", function () {
    var Model = Backbone.Model.extend({
      sync: function(method, model, options) { ok(options.parse); }
    });
    new Model().save();
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
    model.set({z: true});
    deepEqual(events, []);
  });

  test("nested `change` only fires once", 1, function() {
    var model = new Backbone.Model();
    model.on('change', function() {
      ok(true);
      model.set({x: true});
    });
    model.set({x: true});
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
          deepEqual(this.changedAttributes(), {x: true, y: true});
          equal(model.previous('x'), undefined);
          model.set({z: true});
          break;
        case 2:
          deepEqual(this.changedAttributes(), {x: true, y: true, z: true});
          equal(model.previous('y'), undefined);
          break;
        default:
          ok(false);
      }
    });
    model.set({x: true});
  });

  test("nested `change` with silent", 3, function() {
    var count = 0;
    var model = new Backbone.Model();
    model.on('change:y', function() { ok(false); });
    model.on('change', function() {
      switch(count++) {
        case 0:
          deepEqual(this.changedAttributes(), {x: true});
          model.set({y: true}, {silent: true});
          model.set({z: true});
          break;
        case 1:
          deepEqual(this.changedAttributes(), {x: true, y: true, z: true});
          break;
        case 2:
          deepEqual(this.changedAttributes(), {z: false});
          break;
        default:
          ok(false);
      }
    });
    model.set({x: true});
    model.set({z: false});
  });

  test("nested `change:attr` with silent", 0, function() {
    var model = new Backbone.Model();
    model.on('change:y', function(){ ok(false); });
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
  });

  test("multiple nested changes with silent", 1, function() {
    var changes = [];
    var model = new Backbone.Model();
    model.on('change:b', function(model, val) { changes.push(val); });
    model.on('change', function() {
      model.set({b: 1});
    });
    model.set({b: 0});
    deepEqual(changes, [0, 1]);
  });

  test("basic silent change semantics", 1, function() {
    var model = new Backbone.Model;
    model.set({x: 1});
    model.on('change', function(){ ok(true); });
    model.set({x: 2}, {silent: true});
    model.set({x: 1});
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
    model.sync = function (method, model, options) { options.success(); };
    model.on('sync', function(){ ok(true); });
    model.fetch();
    model.save();
    model.destroy();
  });

  asyncTest("#1365 - Destroy: New models execute success callback.", 2, function() {
    new Backbone.Model()
    .on('sync', function() { ok(false); })
    .on('destroy', function(){ ok(true); })
    .destroy({ success: function(){
        ok(true);
        start();
    }});
  });

  test("#1433 - Save: An invalid model cannot be persisted.", 1, function() {
    var model = new Backbone.Model;
    model.validate = function(){ return 'invalid'; };
    model.sync = function(){ ok(false); };
    strictEqual(model.save(), false);
  });

  test("#1377 - Save without attrs triggers 'error'.", 1, function() {
    var Model = Backbone.Model.extend({
      url: '/test/',
      sync: function(method, model, options){ options.success(); },
      validate: function(){ return 'invalid'; }
    });
    var model = new Model({id: 1});
    model.on('invalid', function(){ ok(true); });
    model.save();
  });

  test("#1545 - `undefined` can be passed to a model constructor without coersion", function() {
    var Model = Backbone.Model.extend({
      defaults: { one: 1 },
      initialize : function(attrs, opts) {
        equal(attrs, undefined);
      }
    });
    var emptyattrs = new Model();
    var undefinedattrs = new Model(undefined);
  });

  asyncTest("#1478 - Model `save` does not trigger change on unchanged attributes", 0, function() {
    var Model = Backbone.Model.extend({
      sync: function(method, model, options) {
        setTimeout(function(){
          options.success();
          start();
        }, 0);
      }
    });
    new Model({x: true})
    .on('change:x', function(){ ok(false); })
    .save(null, {wait: true});
  });

  test("#1664 - Changing from one value, silently to another, back to original triggers a change.", 1, function() {
    var model = new Backbone.Model({x:1});
    model.on('change:x', function() { ok(true); });
    model.set({x:2},{silent:true});
    model.set({x:3},{silent:true});
    model.set({x:1});
  });

  test("#1664 - multiple silent changes nested inside a change event", 2, function() {
    var changes = [];
    var model = new Backbone.Model();
    model.on('change', function() {
      model.set({a:'c'}, {silent:true});
      model.set({b:2}, {silent:true});
      model.unset('c', {silent:true});
    });
    model.on('change:a change:b change:c', function(model, val) { changes.push(val); });
    model.set({a:'a', b:1, c:'item'});
    deepEqual(changes, ['a',1,'item']);
    deepEqual(model.attributes, {a: 'c', b: 2});
  });

  test("#1791 - `attributes` is available for `parse`", function() {
    var Model = Backbone.Model.extend({
      parse: function() { this.has('a'); } // shouldn't throw an error
    });
    var model = new Model(null, {parse: true});
    expect(0);
  });

  test("silent changes in last `change` event back to original triggers change", 2, function() {
    var changes = [];
    var model = new Backbone.Model();
    model.on('change:a change:b change:c', function(model, val) { changes.push(val); });
    model.on('change', function() {
      model.set({a:'c'}, {silent:true});
    });
    model.set({a:'a'});
    deepEqual(changes, ['a']);
    model.set({a:'a'});
    deepEqual(changes, ['a', 'a']);
  });

  test("#1943 change calculations should use _.isEqual", function() {
    var model = new Backbone.Model({a: {key: 'value'}});
    model.set('a', {key:'value'}, {silent:true});
    equal(model.changedAttributes(), false);
  });

  test("#1964 - final `change` event is always fired, regardless of interim changes", 1, function () {
    var model = new Backbone.Model();
    model.on('change:property', function() {
      model.set('property', 'bar');
    });
    model.on('change', function() {
      ok(true);
    });
    model.set('property', 'foo');
  });

  test("isValid", function() {
    var model = new Backbone.Model({valid: true});
    model.validate = function(attrs) {
      if (!attrs.valid) return "invalid";
    };
    equal(model.isValid(), true);
    equal(model.set({valid: false}, {validate:true}), false);
    equal(model.isValid(), true);
    model.set({valid:false});
    equal(model.isValid(), false);
    ok(!model.set('valid', false, {validate: true}));
  });

  test("#1179 - isValid returns true in the absence of validate.", 1, function() {
    var model = new Backbone.Model();
    model.validate = null;
    ok(model.isValid());
  });

  test("#1961 - Creating a model with {validate:true} will call validate and use the error callback", function () {
    var Model = Backbone.Model.extend({
      validate: function (attrs) {
        if (attrs.id === 1) return "This shouldn't happen";
      }
    });
    var model = new Model({id: 1}, {validate: true});
    equal(model.validationError, "This shouldn't happen");
  });

  test("toJSON receives attrs during save(..., {wait: true})", 1, function() {
    var Model = Backbone.Model.extend({
      url: '/test',
      toJSON: function() {
        strictEqual(this.attributes.x, 1);
        return _.clone(this.attributes);
      }
    });
    var model = new Model;
    model.save({x: 1}, {wait: true});
  });

  test("#2034 - nested set with silent only triggers one change", 1, function() {
    var model = new Backbone.Model();
    model.on('change', function() {
      model.set({b: true}, {silent: true});
      ok(true);
    });
    model.set({a: true});
  });

})();
