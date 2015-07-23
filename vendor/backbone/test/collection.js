(function() {

  var a, b, c, d, e, col, otherCol;

  module("Backbone.Collection", {

    setup: function() {
      a         = new Backbone.Model({id: 3, label: 'a'});
      b         = new Backbone.Model({id: 2, label: 'b'});
      c         = new Backbone.Model({id: 1, label: 'c'});
      d         = new Backbone.Model({id: 0, label: 'd'});
      e         = null;
      col       = new Backbone.Collection([a,b,c,d]);
      otherCol  = new Backbone.Collection();
    }

  });

  test("new and sort", 6, function() {
    var counter = 0;
    col.on('sort', function(){ counter++; });
    deepEqual(col.pluck('label'), ['a', 'b', 'c', 'd']);
    col.comparator = function(a, b) {
      return a.id > b.id ? -1 : 1;
    };
    col.sort();
    equal(counter, 1);
    deepEqual(col.pluck('label'), ['a', 'b', 'c', 'd']);
    col.comparator = function(model) { return model.id; };
    col.sort();
    equal(counter, 2);
    deepEqual(col.pluck('label'), ['d', 'c', 'b', 'a']);
    equal(col.length, 4);
  });

  test("String comparator.", 1, function() {
    var collection = new Backbone.Collection([
      {id: 3},
      {id: 1},
      {id: 2}
    ], {comparator: 'id'});
    deepEqual(collection.pluck('id'), [1, 2, 3]);
  });

  test("new and parse", 3, function() {
    var Collection = Backbone.Collection.extend({
      parse : function(data) {
        return _.filter(data, function(datum) {
          return datum.a % 2 === 0;
        });
      }
    });
    var models = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var collection = new Collection(models, {parse: true});
    strictEqual(collection.length, 2);
    strictEqual(collection.first().get('a'), 2);
    strictEqual(collection.last().get('a'), 4);
  });

  test("clone preserves model and comparator", 3, function() {
    var Model = Backbone.Model.extend();
    var comparator = function(model){ return model.id; };

    var collection = new Backbone.Collection([{id: 1}], {
      model: Model,
      comparator: comparator
    }).clone();
    collection.add({id: 2});
    ok(collection.at(0) instanceof Model);
    ok(collection.at(1) instanceof Model);
    strictEqual(collection.comparator, comparator);
  });

  test("get", 6, function() {
    equal(col.get(0), d);
    equal(col.get(d.clone()), d);
    equal(col.get(2), b);
    equal(col.get({id: 1}), c);
    equal(col.get(c.clone()), c);
    equal(col.get(col.first().cid), col.first());
  });

  test("get with non-default ids", 5, function() {
    var MongoModel = Backbone.Model.extend({idAttribute: '_id'});
    var model = new MongoModel({_id: 100});
    var col = new Backbone.Collection([model], {model: MongoModel});
    equal(col.get(100), model);
    equal(col.get(model.cid), model);
    equal(col.get(model), model);
    equal(col.get(101), void 0);

    var col2 = new Backbone.Collection();
    col2.model = MongoModel;
    col2.add(model.attributes);
    equal(col2.get(model.clone()), col2.first());
  });

  test('get with "undefined" id', function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 'undefined'}]);
    equal(collection.get(1).id, 1);
  });

  test("update index when id changes", 4, function() {
    var col = new Backbone.Collection();
    col.add([
      {id : 0, name : 'one'},
      {id : 1, name : 'two'}
    ]);
    var one = col.get(0);
    equal(one.get('name'), 'one');
    col.on('change:name', function (model) { ok(this.get(model)); });
    one.set({name: 'dalmatians', id : 101});
    equal(col.get(0), null);
    equal(col.get(101).get('name'), 'dalmatians');
  });

  test("at", 2, function() {
    equal(col.at(2), c);
    equal(col.at(-2), c);
  });

  test("pluck", 1, function() {
    equal(col.pluck('label').join(' '), 'a b c d');
  });

  test("add", 14, function() {
    var added, opts, secondAdded;
    added = opts = secondAdded = null;
    e = new Backbone.Model({id: 10, label : 'e'});
    otherCol.add(e);
    otherCol.on('add', function() {
      secondAdded = true;
    });
    col.on('add', function(model, collection, options){
      added = model.get('label');
      opts = options;
    });
    col.add(e, {amazing: true});
    equal(added, 'e');
    equal(col.length, 5);
    equal(col.last(), e);
    equal(otherCol.length, 1);
    equal(secondAdded, null);
    ok(opts.amazing);

    var f = new Backbone.Model({id: 20, label : 'f'});
    var g = new Backbone.Model({id: 21, label : 'g'});
    var h = new Backbone.Model({id: 22, label : 'h'});
    var atCol = new Backbone.Collection([f, g, h]);
    equal(atCol.length, 3);
    atCol.add(e, {at: 1});
    equal(atCol.length, 4);
    equal(atCol.at(1), e);
    equal(atCol.last(), h);

    var coll = new Backbone.Collection(new Array(2));
    var addCount = 0;
    coll.on('add', function(){
        addCount += 1;
    });
    coll.add([undefined, f, g]);
    equal(coll.length, 5);
    equal(addCount, 3);
    coll.add(new Array(4));
    equal(coll.length, 9);
    equal(addCount, 7);
  });

  test("add multiple models", 6, function() {
    var col = new Backbone.Collection([{at: 0}, {at: 1}, {at: 9}]);
    col.add([{at: 2}, {at: 3}, {at: 4}, {at: 5}, {at: 6}, {at: 7}, {at: 8}], {at: 2});
    for (var i = 0; i <= 5; i++) {
      equal(col.at(i).get('at'), i);
    }
  });

  test("add; at should have preference over comparator", 1, function() {
    var Col = Backbone.Collection.extend({
      comparator: function(a,b) {
        return a.id > b.id ? -1 : 1;
      }
    });

    var col = new Col([{id: 2}, {id: 3}]);
    col.add(new Backbone.Model({id: 1}), {at:   1});

    equal(col.pluck('id').join(' '), '3 1 2');
  });

  test("can't add model to collection twice", function() {
    var col = new Backbone.Collection([{id: 1}, {id: 2}, {id: 1}, {id: 2}, {id: 3}]);
    equal(col.pluck('id').join(' '), '1 2 3');
  });

  test("can't add different model with same id to collection twice", 1, function() {
    var col = new Backbone.Collection;
    col.unshift({id: 101});
    col.add({id: 101});
    equal(col.length, 1);
  });

  test("merge in duplicate models with {merge: true}", 3, function() {
    var col = new Backbone.Collection;
    col.add([{id: 1, name: 'Moe'}, {id: 2, name: 'Curly'}, {id: 3, name: 'Larry'}]);
    col.add({id: 1, name: 'Moses'});
    equal(col.first().get('name'), 'Moe');
    col.add({id: 1, name: 'Moses'}, {merge: true});
    equal(col.first().get('name'), 'Moses');
    col.add({id: 1, name: 'Tim'}, {merge: true, silent: true});
    equal(col.first().get('name'), 'Tim');
  });

  test("add model to multiple collections", 10, function() {
    var counter = 0;
    var e = new Backbone.Model({id: 10, label : 'e'});
    e.on('add', function(model, collection) {
      counter++;
      equal(e, model);
      if (counter > 1) {
        equal(collection, colF);
      } else {
        equal(collection, colE);
      }
    });
    var colE = new Backbone.Collection([]);
    colE.on('add', function(model, collection) {
      equal(e, model);
      equal(colE, collection);
    });
    var colF = new Backbone.Collection([]);
    colF.on('add', function(model, collection) {
      equal(e, model);
      equal(colF, collection);
    });
    colE.add(e);
    equal(e.collection, colE);
    colF.add(e);
    equal(e.collection, colE);
  });

  test("add model with parse", 1, function() {
    var Model = Backbone.Model.extend({
      parse: function(obj) {
        obj.value += 1;
        return obj;
      }
    });

    var Col = Backbone.Collection.extend({model: Model});
    var col = new Col;
    col.add({value: 1}, {parse: true});
    equal(col.at(0).get('value'), 2);
  });

  test("add with parse and merge", function() {
    var collection = new Backbone.Collection();
    collection.parse = function(attrs) {
      return _.map(attrs, function(model) {
        if (model.model) return model.model;
        return model;
      });
    };
    collection.add({id: 1});
    collection.add({model: {id: 1, name: 'Alf'}}, {parse: true, merge: true});
    equal(collection.first().get('name'), 'Alf');
  });

  test("add model to collection with sort()-style comparator", 3, function() {
    var col = new Backbone.Collection;
    col.comparator = function(a, b) {
      return a.get('name') < b.get('name') ? -1 : 1;
    };
    var tom = new Backbone.Model({name: 'Tom'});
    var rob = new Backbone.Model({name: 'Rob'});
    var tim = new Backbone.Model({name: 'Tim'});
    col.add(tom);
    col.add(rob);
    col.add(tim);
    equal(col.indexOf(rob), 0);
    equal(col.indexOf(tim), 1);
    equal(col.indexOf(tom), 2);
  });

  test("comparator that depends on `this`", 2, function() {
    var col = new Backbone.Collection;
    col.negative = function(num) {
      return -num;
    };
    col.comparator = function(a) {
      return this.negative(a.id);
    };
    col.add([{id: 1}, {id: 2}, {id: 3}]);
    deepEqual(col.pluck('id'), [3, 2, 1]);
    col.comparator = function(a, b) {
      return this.negative(b.id) - this.negative(a.id);
    };
    col.sort();
    deepEqual(col.pluck('id'), [1, 2, 3]);
  });

  test("remove", 10, function() {
    var removed = null;
    var result = null;
    col.on('remove', function(model, col, options) {
      removed = model.get('label');
      equal(options.index, 3);
    });
    result = col.remove(d);
    equal(removed, 'd');
    strictEqual(result, d);
    //if we try to remove d again, it's not going to actually get removed
    result = col.remove(d);
    strictEqual(result, undefined);
    equal(col.length, 3);
    equal(col.first(), a);
    col.off();
    result = col.remove([c, d]);
    equal(result.length, 1, 'only returns removed models');
    equal(result[0], c, 'only returns removed models');
    result = col.remove([c, b]);
    equal(result.length, 1, 'only returns removed models');
    equal(result[0], b, 'only returns removed models');
  });

  test("add and remove return values", 13, function() {
    var Even = Backbone.Model.extend({
      validate: function(attrs) {
        if (attrs.id % 2 !== 0) return "odd";
      }
    });
    var col = new Backbone.Collection;
    col.model = Even;

    var list = col.add([{id: 2}, {id: 4}], {validate: true});
    equal(list.length, 2);
    ok(list[0] instanceof Backbone.Model);
    equal(list[1], col.last());
    equal(list[1].get('id'), 4);

    list = col.add([{id: 3}, {id: 6}], {validate: true});
    equal(col.length, 3);
    equal(list[0], false);
    equal(list[1].get('id'), 6);

    var result = col.add({id: 6});
    equal(result.cid, list[1].cid);

    result = col.remove({id: 6});
    equal(col.length, 2);
    equal(result.id, 6);

    list = col.remove([{id: 2}, {id: 8}]);
    equal(col.length, 1);
    equal(list[0].get('id'), 2);
    equal(list[1], null);
  });

  test("shift and pop", 2, function() {
    var col = new Backbone.Collection([{a: 'a'}, {b: 'b'}, {c: 'c'}]);
    equal(col.shift().get('a'), 'a');
    equal(col.pop().get('c'), 'c');
  });

  test("slice", 2, function() {
    var col = new Backbone.Collection([{a: 'a'}, {b: 'b'}, {c: 'c'}]);
    var array = col.slice(1, 3);
    equal(array.length, 2);
    equal(array[0].get('b'), 'b');
  });

  test("events are unbound on remove", 3, function() {
    var counter = 0;
    var dj = new Backbone.Model();
    var emcees = new Backbone.Collection([dj]);
    emcees.on('change', function(){ counter++; });
    dj.set({name : 'Kool'});
    equal(counter, 1);
    emcees.reset([]);
    equal(dj.collection, undefined);
    dj.set({name : 'Shadow'});
    equal(counter, 1);
  });

  test("remove in multiple collections", 7, function() {
    var modelData = {
      id : 5,
      title : 'Othello'
    };
    var passed = false;
    var e = new Backbone.Model(modelData);
    var f = new Backbone.Model(modelData);
    f.on('remove', function() {
      passed = true;
    });
    var colE = new Backbone.Collection([e]);
    var colF = new Backbone.Collection([f]);
    ok(e != f);
    ok(colE.length === 1);
    ok(colF.length === 1);
    colE.remove(e);
    equal(passed, false);
    ok(colE.length === 0);
    colF.remove(e);
    ok(colF.length === 0);
    equal(passed, true);
  });

  test("remove same model in multiple collection", 16, function() {
    var counter = 0;
    var e = new Backbone.Model({id: 5, title: 'Othello'});
    e.on('remove', function(model, collection) {
      counter++;
      equal(e, model);
      if (counter > 1) {
        equal(collection, colE);
      } else {
        equal(collection, colF);
      }
    });
    var colE = new Backbone.Collection([e]);
    colE.on('remove', function(model, collection) {
      equal(e, model);
      equal(colE, collection);
    });
    var colF = new Backbone.Collection([e]);
    colF.on('remove', function(model, collection) {
      equal(e, model);
      equal(colF, collection);
    });
    equal(colE, e.collection);
    colF.remove(e);
    ok(colF.length === 0);
    ok(colE.length === 1);
    equal(counter, 1);
    equal(colE, e.collection);
    colE.remove(e);
    equal(null, e.collection);
    ok(colE.length === 0);
    equal(counter, 2);
  });

  test("model destroy removes from all collections", 3, function() {
    var e = new Backbone.Model({id: 5, title: 'Othello'});
    e.sync = function(method, model, options) { options.success(); };
    var colE = new Backbone.Collection([e]);
    var colF = new Backbone.Collection([e]);
    e.destroy();
    ok(colE.length === 0);
    ok(colF.length === 0);
    equal(undefined, e.collection);
  });

  test("Colllection: non-persisted model destroy removes from all collections", 3, function() {
    var e = new Backbone.Model({title: 'Othello'});
    e.sync = function(method, model, options) { throw "should not be called"; };
    var colE = new Backbone.Collection([e]);
    var colF = new Backbone.Collection([e]);
    e.destroy();
    ok(colE.length === 0);
    ok(colF.length === 0);
    equal(undefined, e.collection);
  });

  test("fetch", 4, function() {
    var collection = new Backbone.Collection;
    collection.url = '/test';
    collection.fetch();
    equal(this.syncArgs.method, 'read');
    equal(this.syncArgs.model, collection);
    equal(this.syncArgs.options.parse, true);

    collection.fetch({parse: false});
    equal(this.syncArgs.options.parse, false);
  });

  test("fetch with an error response triggers an error event", 1, function () {
    var collection = new Backbone.Collection();
    collection.on('error', function () {
      ok(true);
    });
    collection.sync = function (method, model, options) { options.error(); };
    collection.fetch();
  });

  test("#3283 - fetch with an error response calls error with context", 1, function () {
    var collection = new Backbone.Collection();
    var obj = {};
    var options = {
      context: obj,
      error: function() {
        equal(this, obj);
      }
    };
    collection.sync = function (method, model, options) {
      options.error.call(options.context);
    };
    collection.fetch(options);
  });

  test("ensure fetch only parses once", 1, function() {
    var collection = new Backbone.Collection;
    var counter = 0;
    collection.parse = function(models) {
      counter++;
      return models;
    };
    collection.url = '/test';
    collection.fetch();
    this.syncArgs.options.success();
    equal(counter, 1);
  });

  test("create", 4, function() {
    var collection = new Backbone.Collection;
    collection.url = '/test';
    var model = collection.create({label: 'f'}, {wait: true});
    equal(this.syncArgs.method, 'create');
    equal(this.syncArgs.model, model);
    equal(model.get('label'), 'f');
    equal(model.collection, collection);
  });

  test("create with validate:true enforces validation", 3, function() {
    var ValidatingModel = Backbone.Model.extend({
      validate: function(attrs) {
        return "fail";
      }
    });
    var ValidatingCollection = Backbone.Collection.extend({
      model: ValidatingModel
    });
    var col = new ValidatingCollection();
    col.on('invalid', function (collection, error, options) {
      equal(error, "fail");
      equal(options.validationError, 'fail');
    });
    equal(col.create({"foo":"bar"}, {validate:true}), false);
  });

  test("create will pass extra options to success callback", 1, function () {
    var Model = Backbone.Model.extend({
      sync: function (method, model, options) {
        _.extend(options, {specialSync: true});
        return Backbone.Model.prototype.sync.call(this, method, model, options);
      }
    });

    var Collection = Backbone.Collection.extend({
      model: Model,
      url: '/test'
    });

    var collection = new Collection;

    var success = function (model, response, options) {
      ok(options.specialSync, "Options were passed correctly to callback");
    };

    collection.create({}, {success: success});
    this.ajaxSettings.success();

  });

  test("create with wait:true should not call collection.parse", 0, function() {
    var Collection = Backbone.Collection.extend({
      url: '/test',
      parse: function () {
        ok(false);
      }
    });

    var collection = new Collection;

    collection.create({}, {wait: true});
    this.ajaxSettings.success();
  });

  test("a failing create returns model with errors", function() {
    var ValidatingModel = Backbone.Model.extend({
      validate: function(attrs) {
        return "fail";
      }
    });
    var ValidatingCollection = Backbone.Collection.extend({
      model: ValidatingModel
    });
    var col = new ValidatingCollection();
    var m = col.create({"foo":"bar"});
    equal(m.validationError, 'fail');
    equal(col.length, 1);
  });

  test("initialize", 1, function() {
    var Collection = Backbone.Collection.extend({
      initialize: function() {
        this.one = 1;
      }
    });
    var coll = new Collection;
    equal(coll.one, 1);
  });

  test("toJSON", 1, function() {
    equal(JSON.stringify(col), '[{"id":3,"label":"a"},{"id":2,"label":"b"},{"id":1,"label":"c"},{"id":0,"label":"d"}]');
  });

  test("where and findWhere", 8, function() {
    var model = new Backbone.Model({a: 1});
    var coll = new Backbone.Collection([
      model,
      {a: 1},
      {a: 1, b: 2},
      {a: 2, b: 2},
      {a: 3}
    ]);
    equal(coll.where({a: 1}).length, 3);
    equal(coll.where({a: 2}).length, 1);
    equal(coll.where({a: 3}).length, 1);
    equal(coll.where({b: 1}).length, 0);
    equal(coll.where({b: 2}).length, 2);
    equal(coll.where({a: 1, b: 2}).length, 1);
    equal(coll.findWhere({a: 1}), model);
    equal(coll.findWhere({a: 4}), void 0);
  });

  test("Underscore methods", 19, function() {
    equal(col.map(function(model){ return model.get('label'); }).join(' '), 'a b c d');
    equal(col.any(function(model){ return model.id === 100; }), false);
    equal(col.any(function(model){ return model.id === 0; }), true);
    equal(col.indexOf(b), 1);
    equal(col.size(), 4);
    equal(col.rest().length, 3);
    ok(!_.include(col.rest(), a));
    ok(_.include(col.rest(), d));
    ok(!col.isEmpty());
    ok(!_.include(col.without(d), d));
    equal(col.max(function(model){ return model.id; }).id, 3);
    equal(col.min(function(model){ return model.id; }).id, 0);
    deepEqual(col.chain()
            .filter(function(o){ return o.id % 2 === 0; })
            .map(function(o){ return o.id * 2; })
            .value(),
         [4, 0]);
    deepEqual(col.difference([c, d]), [a, b]);
    ok(col.include(col.sample()));
    var first = col.first();
    deepEqual(col.groupBy(function(model){ return model.id; })[first.id], [first]);
    deepEqual(col.countBy(function(model){ return model.id; }), {0: 1, 1: 1, 2: 1, 3: 1});
    deepEqual(col.sortBy(function(model){ return model.id; })[0], col.at(3));
    ok(col.indexBy('id')[first.id] === first);
  });

  test("Underscore methods with object-style and property-style iteratee", 22, function () {
    var model = new Backbone.Model({a: 4, b: 1, e: 3});
    var coll = new Backbone.Collection([
      {a: 1, b: 1},
      {a: 2, b: 1, c: 1},
      {a: 3, b: 1},
      model
    ]);
    equal(coll.find({a: 0}), undefined);
    deepEqual(coll.find({a: 4}), model);
    equal(coll.find('d'), undefined);
    deepEqual(coll.find('e'), model);
    equal(coll.filter({a: 0}), false);
    deepEqual(coll.filter({a: 4}), [model]);
    equal(coll.some({a: 0}), false);
    equal(coll.some({a: 1}), true);
    equal(coll.reject({a: 0}).length, 4);
    deepEqual(coll.reject({a: 4}), _.without(coll.models, model));
    equal(coll.every({a: 0}), false);
    equal(coll.every({b: 1}), true);
    deepEqual(coll.partition({a: 0})[0], []);
    deepEqual(coll.partition({a: 0})[1], coll.models);
    deepEqual(coll.partition({a: 4})[0], [model]);
    deepEqual(coll.partition({a: 4})[1], _.without(coll.models, model));
    deepEqual(coll.map({a: 2}), [false, true, false, false]);
    deepEqual(coll.map('a'), [1, 2, 3, 4]);
    deepEqual(coll.max('a'), model);
    deepEqual(coll.min('e'), model);
    deepEqual(coll.countBy({a: 4}), {'false': 3, 'true': 1});
    deepEqual(coll.countBy('d'), {'undefined': 4});
  });

  test("reset", 16, function() {
    var resetCount = 0;
    var models = col.models;
    col.on('reset', function() { resetCount += 1; });
    col.reset([]);
    equal(resetCount, 1);
    equal(col.length, 0);
    equal(col.last(), null);
    col.reset(models);
    equal(resetCount, 2);
    equal(col.length, 4);
    equal(col.last(), d);
    col.reset(_.map(models, function(m){ return m.attributes; }));
    equal(resetCount, 3);
    equal(col.length, 4);
    ok(col.last() !== d);
    ok(_.isEqual(col.last().attributes, d.attributes));
    col.reset();
    equal(col.length, 0);
    equal(resetCount, 4);

    var f = new Backbone.Model({id: 20, label : 'f'});
    col.reset([undefined, f]);
    equal(col.length, 2);
    equal(resetCount, 5);

    col.reset(new Array(4));
    equal(col.length, 4);
    equal(resetCount, 6);
  });

  test ("reset with different values", function(){
    var col = new Backbone.Collection({id: 1});
    col.reset({id: 1, a: 1});
    equal(col.get(1).get('a'), 1);
  });

  test("same references in reset", function() {
    var model = new Backbone.Model({id: 1});
    var collection = new Backbone.Collection({id: 1});
    collection.reset(model);
    equal(collection.get(1), model);
  });

  test("reset passes caller options", 3, function() {
    var Model = Backbone.Model.extend({
      initialize: function(attrs, options) {
        this.model_parameter = options.model_parameter;
      }
    });
    var col = new (Backbone.Collection.extend({ model: Model }))();
    col.reset([{ astring: "green", anumber: 1 }, { astring: "blue", anumber: 2 }], { model_parameter: 'model parameter' });
    equal(col.length, 2);
    col.each(function(model) {
      equal(model.model_parameter, 'model parameter');
    });
  });

  test("reset does not alter options by reference", 2, function() {
    var col = new Backbone.Collection([{id:1}]);
    var origOpts = {};
    col.on("reset", function(col, opts){
      equal(origOpts.previousModels, undefined);
      equal(opts.previousModels[0].id, 1);
    });
    col.reset([], origOpts);
  });

  test("trigger custom events on models", 1, function() {
    var fired = null;
    a.on("custom", function() { fired = true; });
    a.trigger("custom");
    equal(fired, true);
  });

  test("add does not alter arguments", 2, function(){
    var attrs = {};
    var models = [attrs];
    new Backbone.Collection().add(models);
    equal(models.length, 1);
    ok(attrs === models[0]);
  });

  test("#714: access `model.collection` in a brand new model.", 2, function() {
    var collection = new Backbone.Collection;
    collection.url = '/test';
    var Model = Backbone.Model.extend({
      set: function(attrs) {
        equal(attrs.prop, 'value');
        equal(this.collection, collection);
        return this;
      }
    });
    collection.model = Model;
    collection.create({prop: 'value'});
  });

  test("#574, remove its own reference to the .models array.", 2, function() {
    var col = new Backbone.Collection([
      {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}
    ]);
    equal(col.length, 6);
    col.remove(col.models);
    equal(col.length, 0);
  });

  test("#861, adding models to a collection which do not pass validation, with validate:true", 2, function() {
    var Model = Backbone.Model.extend({
      validate: function(attrs) {
        if (attrs.id == 3) return "id can't be 3";
      }
    });

    var Collection = Backbone.Collection.extend({
      model: Model
    });

    var collection = new Collection;
    collection.on("invalid", function() { ok(true); });

    collection.add([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}], {validate:true});
    deepEqual(collection.pluck("id"), [1, 2, 4, 5, 6]);
  });

  test("Invalid models are discarded with validate:true.", 5, function() {
    var collection = new Backbone.Collection;
    collection.on('test', function() { ok(true); });
    collection.model = Backbone.Model.extend({
      validate: function(attrs){ if (!attrs.valid) return 'invalid'; }
    });
    var model = new collection.model({id: 1, valid: true});
    collection.add([model, {id: 2}], {validate:true});
    model.trigger('test');
    ok(collection.get(model.cid));
    ok(collection.get(1));
    ok(!collection.get(2));
    equal(collection.length, 1);
  });

  test("multiple copies of the same model", 3, function() {
    var col = new Backbone.Collection();
    var model = new Backbone.Model();
    col.add([model, model]);
    equal(col.length, 1);
    col.add([{id: 1}, {id: 1}]);
    equal(col.length, 2);
    equal(col.last().id, 1);
  });

  test("#964 - collection.get return inconsistent", 2, function() {
    var c = new Backbone.Collection();
    ok(c.get(null) === undefined);
    ok(c.get() === undefined);
  });

  test("#1112 - passing options.model sets collection.model", 2, function() {
    var Model = Backbone.Model.extend({});
    var c = new Backbone.Collection([{id: 1}], {model: Model});
    ok(c.model === Model);
    ok(c.at(0) instanceof Model);
  });

  test("null and undefined are invalid ids.", 2, function() {
    var model = new Backbone.Model({id: 1});
    var collection = new Backbone.Collection([model]);
    model.set({id: null});
    ok(!collection.get('null'));
    model.set({id: 1});
    model.set({id: undefined});
    ok(!collection.get('undefined'));
  });

  test("falsy comparator", 4, function(){
    var Col = Backbone.Collection.extend({
      comparator: function(model){ return model.id; }
    });
    var col = new Col();
    var colFalse = new Col(null, {comparator: false});
    var colNull = new Col(null, {comparator: null});
    var colUndefined = new Col(null, {comparator: undefined});
    ok(col.comparator);
    ok(!colFalse.comparator);
    ok(!colNull.comparator);
    ok(colUndefined.comparator);
  });

  test("#1355 - `options` is passed to success callbacks", 2, function(){
    var m = new Backbone.Model({x:1});
    var col = new Backbone.Collection();
    var opts = {
      opts: true,
      success: function(collection, resp, options) {
        ok(options.opts);
      }
    };
    col.sync = m.sync = function( method, collection, options ){
      options.success({});
    };
    col.fetch(opts);
    col.create(m, opts);
  });

  test("#1412 - Trigger 'request' and 'sync' events.", 4, function() {
    var collection = new Backbone.Collection;
    collection.url = '/test';
    Backbone.ajax = function(settings){ settings.success(); };

    collection.on('request', function(obj, xhr, options) {
      ok(obj === collection, "collection has correct 'request' event after fetching");
    });
    collection.on('sync', function(obj, response, options) {
      ok(obj === collection, "collection has correct 'sync' event after fetching");
    });
    collection.fetch();
    collection.off();

    collection.on('request', function(obj, xhr, options) {
      ok(obj === collection.get(1), "collection has correct 'request' event after one of its models save");
    });
    collection.on('sync', function(obj, response, options) {
      ok(obj === collection.get(1), "collection has correct 'sync' event after one of its models save");
    });
    collection.create({id: 1});
    collection.off();
  });

  test("#3283 - fetch, create calls success with context", 2, function() {
    var collection = new Backbone.Collection;
    collection.url = '/test';
    Backbone.ajax = function(settings) {
      settings.success.call(settings.context);
    };
    var obj = {};
    var options = {
      context: obj,
      success: function() {
        equal(this, obj);
      }
    };

    collection.fetch(options);
    collection.create({id: 1}, options);
  });

  test("#1447 - create with wait adds model.", 1, function() {
    var collection = new Backbone.Collection;
    var model = new Backbone.Model;
    model.sync = function(method, model, options){ options.success(); };
    collection.on('add', function(){ ok(true); });
    collection.create(model, {wait: true});
  });

  test("#1448 - add sorts collection after merge.", 1, function() {
    var collection = new Backbone.Collection([
      {id: 1, x: 1},
      {id: 2, x: 2}
    ]);
    collection.comparator = function(model){ return model.get('x'); };
    collection.add({id: 1, x: 3}, {merge: true});
    deepEqual(collection.pluck('id'), [2, 1]);
  });

  test("#1655 - groupBy can be used with a string argument.", 3, function() {
    var collection = new Backbone.Collection([{x: 1}, {x: 2}]);
    var grouped = collection.groupBy('x');
    strictEqual(_.keys(grouped).length, 2);
    strictEqual(grouped[1][0].get('x'), 1);
    strictEqual(grouped[2][0].get('x'), 2);
  });

  test("#1655 - sortBy can be used with a string argument.", 1, function() {
    var collection = new Backbone.Collection([{x: 3}, {x: 1}, {x: 2}]);
    var values = _.map(collection.sortBy('x'), function(model) {
      return model.get('x');
    });
    deepEqual(values, [1, 2, 3]);
  });

  test("#1604 - Removal during iteration.", 0, function() {
    var collection = new Backbone.Collection([{}, {}]);
    collection.on('add', function() {
      collection.at(0).destroy();
    });
    collection.add({}, {at: 0});
  });

  test("#1638 - `sort` during `add` triggers correctly.", function() {
    var collection = new Backbone.Collection;
    collection.comparator = function(model) { return model.get('x'); };
    var added = [];
    collection.on('add', function(model) {
      model.set({x: 3});
      collection.sort();
      added.push(model.id);
    });
    collection.add([{id: 1, x: 1}, {id: 2, x: 2}]);
    deepEqual(added, [1, 2]);
  });

  test("fetch parses models by default", 1, function() {
    var model = {};
    var Collection = Backbone.Collection.extend({
      url: 'test',
      model: Backbone.Model.extend({
        parse: function(resp) {
          strictEqual(resp, model);
        }
      })
    });
    new Collection().fetch();
    this.ajaxSettings.success([model]);
  });

  test("`sort` shouldn't always fire on `add`", 1, function() {
    var c = new Backbone.Collection([{id: 1}, {id: 2}, {id: 3}], {
      comparator: 'id'
    });
    c.sort = function(){ ok(true); };
    c.add([]);
    c.add({id: 1});
    c.add([{id: 2}, {id: 3}]);
    c.add({id: 4});
  });

  test("#1407 parse option on constructor parses collection and models", 2, function() {
    var model = {
      namespace : [{id: 1}, {id:2}]
    };
    var Collection = Backbone.Collection.extend({
      model: Backbone.Model.extend({
        parse: function(model) {
          model.name = 'test';
          return model;
        }
      }),
      parse: function(model) {
        return model.namespace;
      }
    });
    var c = new Collection(model, {parse:true});

    equal(c.length, 2);
    equal(c.at(0).get('name'), 'test');
  });

  test("#1407 parse option on reset parses collection and models", 2, function() {
    var model = {
      namespace : [{id: 1}, {id:2}]
    };
    var Collection = Backbone.Collection.extend({
      model: Backbone.Model.extend({
        parse: function(model) {
          model.name = 'test';
          return model;
        }
      }),
      parse: function(model) {
        return model.namespace;
      }
    });
    var c = new Collection();
        c.reset(model, {parse:true});

    equal(c.length, 2);
    equal(c.at(0).get('name'), 'test');
  });


  test("Reset includes previous models in triggered event.", 1, function() {
    var model = new Backbone.Model();
    var collection = new Backbone.Collection([model])
    .on('reset', function(collection, options) {
      deepEqual(options.previousModels, [model]);
    });
    collection.reset([]);
  });

  test("set", function() {
    var m1 = new Backbone.Model();
    var m2 = new Backbone.Model({id: 2});
    var m3 = new Backbone.Model();
    var c = new Backbone.Collection([m1, m2]);

    // Test add/change/remove events
    c.on('add', function(model) {
      strictEqual(model, m3);
    });
    c.on('change', function(model) {
      strictEqual(model, m2);
    });
    c.on('remove', function(model) {
      strictEqual(model, m1);
    });

    // remove: false doesn't remove any models
    c.set([], {remove: false});
    strictEqual(c.length, 2);

    // add: false doesn't add any models
    c.set([m1, m2, m3], {add: false});
    strictEqual(c.length, 2);

    // merge: false doesn't change any models
    c.set([m1, {id: 2, a: 1}], {merge: false});
    strictEqual(m2.get('a'), void 0);

    // add: false, remove: false only merges existing models
    c.set([m1, {id: 2, a: 0}, m3, {id: 4}], {add: false, remove: false});
    strictEqual(c.length, 2);
    strictEqual(m2.get('a'), 0);

    // default options add/remove/merge as appropriate
    c.set([{id: 2, a: 1}, m3]);
    strictEqual(c.length, 2);
    strictEqual(m2.get('a'), 1);

    // Test removing models not passing an argument
    c.off('remove').on('remove', function(model) {
      ok(model === m2 || model === m3);
    });
    c.set([]);
    strictEqual(c.length, 0);
  });

  test("set with only cids", 3, function() {
    var m1 = new Backbone.Model;
    var m2 = new Backbone.Model;
    var c = new Backbone.Collection;
    c.set([m1, m2]);
    equal(c.length, 2);
    c.set([m1]);
    equal(c.length, 1);
    c.set([m1, m1, m1, m2, m2], {remove: false});
    equal(c.length, 2);
  });

  test("set with only idAttribute", 3, function() {
    var m1 = { _id: 1 };
    var m2 = { _id: 2 };
    var col = Backbone.Collection.extend({
      model: Backbone.Model.extend({
        idAttribute: '_id'
      })
    });
    var c = new col;
    c.set([m1, m2]);
    equal(c.length, 2);
    c.set([m1]);
    equal(c.length, 1);
    c.set([m1, m1, m1, m2, m2], {remove: false});
    equal(c.length, 2);
  });

  test("set + merge with default values defined", function() {
    var Model = Backbone.Model.extend({
      defaults: {
        key: 'value'
      }
    });
    var m = new Model({id: 1});
    var col = new Backbone.Collection([m], {model: Model});
    equal(col.first().get('key'), 'value');

    col.set({id: 1, key: 'other'});
    equal(col.first().get('key'), 'other');

    col.set({id: 1, other: 'value'});
    equal(col.first().get('key'), 'other');
    equal(col.length, 1);
  });

  test('merge without mutation', function () {
    var Model = Backbone.Model.extend({
      initialize: function (attrs, options) {
        if (attrs.child) {
          this.set('child', new Model(attrs.child, options), options);
        }
      }
    });
    var Collection = Backbone.Collection.extend({model: Model});
    var data = [{id: 1, child: {id: 2}}];
    var collection = new Collection(data);
    equal(collection.first().id, 1);
    collection.set(data);
    equal(collection.first().id, 1);
    collection.set([{id: 2, child: {id: 2}}].concat(data));
    deepEqual(collection.pluck('id'), [2, 1]);
  });

  test("`set` and model level `parse`", function() {
    var Model = Backbone.Model.extend({});
    var Collection = Backbone.Collection.extend({
      model: Model,
      parse: function (res) { return _.pluck(res.models, 'model'); }
    });
    var model = new Model({id: 1});
    var collection = new Collection(model);
    collection.set({models: [
      {model: {id: 1}},
      {model: {id: 2}}
    ]}, {parse: true});
    equal(collection.first(), model);
  });

  test("`set` data is only parsed once", function() {
    var collection = new Backbone.Collection();
    collection.model = Backbone.Model.extend({
      parse: function (data) {
        equal(data.parsed, void 0);
        data.parsed = true;
        return data;
      }
    });
    collection.set({}, {parse: true});
  });

  test('`set` matches input order in the absence of a comparator', function () {
    var one = new Backbone.Model({id: 1});
    var two = new Backbone.Model({id: 2});
    var three = new Backbone.Model({id: 3});
    var collection = new Backbone.Collection([one, two, three]);
    collection.set([{id: 3}, {id: 2}, {id: 1}]);
    deepEqual(collection.models, [three, two, one]);
    collection.set([{id: 1}, {id: 2}]);
    deepEqual(collection.models, [one, two]);
    collection.set([two, three, one]);
    deepEqual(collection.models, [two, three, one]);
    collection.set([{id: 1}, {id: 2}], {remove: false});
    deepEqual(collection.models, [two, three, one]);
    collection.set([{id: 1}, {id: 2}, {id: 3}], {merge: false});
    deepEqual(collection.models, [one, two, three]);
    collection.set([three, two, one, {id: 4}], {add: false});
    deepEqual(collection.models, [one, two, three]);
  });

  test("#1894 - Push should not trigger a sort", 0, function() {
    var Collection = Backbone.Collection.extend({
      comparator: 'id',
      sort: function() { ok(false); }
    });
    new Collection().push({id: 1});
  });

  test("#2428 - push duplicate models, return the correct one", 1, function() {
    var col = new Backbone.Collection;
    var model1 = col.push({id: 101});
    var model2 = col.push({id: 101})
    ok(model2.cid == model1.cid);
  });

  test("`set` with non-normal id", function() {
    var Collection = Backbone.Collection.extend({
      model: Backbone.Model.extend({idAttribute: '_id'})
    });
    var collection = new Collection({_id: 1});
    collection.set([{_id: 1, a: 1}], {add: false});
    equal(collection.first().get('a'), 1);
  });

  test("#1894 - `sort` can optionally be turned off", 0, function() {
    var Collection = Backbone.Collection.extend({
      comparator: 'id',
      sort: function() { ok(false); }
    });
    new Collection().add({id: 1}, {sort: false});
  });

  test("#1915 - `parse` data in the right order in `set`", function() {
    var collection = new (Backbone.Collection.extend({
      parse: function (data) {
        strictEqual(data.status, 'ok');
        return data.data;
      }
    }));
    var res = {status: 'ok', data:[{id: 1}]};
    collection.set(res, {parse: true});
  });

  asyncTest("#1939 - `parse` is passed `options`", 1, function () {
    var collection = new (Backbone.Collection.extend({
      url: '/',
      parse: function (data, options) {
        strictEqual(options.xhr.someHeader, 'headerValue');
        return data;
      }
    }));
    var ajax = Backbone.ajax;
    Backbone.ajax = function (params) {
      _.defer(params.success);
      return {someHeader: 'headerValue'};
    };
    collection.fetch({
      success: function () { start(); }
    });
    Backbone.ajax = ajax;
  });

  test("fetch will pass extra options to success callback", 1, function () {
    var SpecialSyncCollection = Backbone.Collection.extend({
      url: '/test',
      sync: function (method, collection, options) {
        _.extend(options, { specialSync: true });
        return Backbone.Collection.prototype.sync.call(this, method, collection, options);
      }
    });

    var collection = new SpecialSyncCollection();

    var onSuccess = function (collection, resp, options) {
      ok(options.specialSync, "Options were passed correctly to callback");
    };

    collection.fetch({ success: onSuccess });
    this.ajaxSettings.success();
  });

  test("`add` only `sort`s when necessary", 2, function () {
    var collection = new (Backbone.Collection.extend({
      comparator: 'a'
    }))([{id: 1}, {id: 2}, {id: 3}]);
    collection.on('sort', function () { ok(true); });
    collection.add({id: 4}); // do sort, new model
    collection.add({id: 1, a: 1}, {merge: true}); // do sort, comparator change
    collection.add({id: 1, b: 1}, {merge: true}); // don't sort, no comparator change
    collection.add({id: 1, a: 1}, {merge: true}); // don't sort, no comparator change
    collection.add(collection.models); // don't sort, nothing new
    collection.add(collection.models, {merge: true}); // don't sort
  });

  test("`add` only `sort`s when necessary with comparator function", 3, function () {
    var collection = new (Backbone.Collection.extend({
      comparator: function(a, b) {
        return a.get('a') > b.get('a') ? 1 : (a.get('a') < b.get('a') ? -1 : 0);
      }
    }))([{id: 1}, {id: 2}, {id: 3}]);
    collection.on('sort', function () { ok(true); });
    collection.add({id: 4}); // do sort, new model
    collection.add({id: 1, a: 1}, {merge: true}); // do sort, model change
    collection.add({id: 1, b: 1}, {merge: true}); // do sort, model change
    collection.add({id: 1, a: 1}, {merge: true}); // don't sort, no model change
    collection.add(collection.models); // don't sort, nothing new
    collection.add(collection.models, {merge: true}); // don't sort
  });

  test("Attach options to collection.", 2, function() {
    var Model = Backbone.Model;
    var comparator = function(){};

    var collection = new Backbone.Collection([], {
      model: Model,
      comparator: comparator
    });

    ok(collection.model === Model);
    ok(collection.comparator === comparator);
  });

  test("`add` overrides `set` flags", function () {
    var collection = new Backbone.Collection();
    collection.once('add', function (model, collection, options) {
      collection.add({id: 2}, options);
    });
    collection.set({id: 1});
    equal(collection.length, 2);
  });

  test("#2606 - Collection#create, success arguments", 1, function() {
    var collection = new Backbone.Collection;
    collection.url = 'test';
    collection.create({}, {
      success: function(model, resp, options) {
        strictEqual(resp, 'response');
      }
    });
    this.ajaxSettings.success('response');
  });

  test("#2612 - nested `parse` works with `Collection#set`", function() {

    var Job = Backbone.Model.extend({
      constructor: function() {
        this.items = new Items();
        Backbone.Model.apply(this, arguments);
      },
      parse: function(attrs) {
        this.items.set(attrs.items, {parse: true});
        return _.omit(attrs, 'items');
      }
    });

    var Item = Backbone.Model.extend({
      constructor: function() {
        this.subItems = new Backbone.Collection();
        Backbone.Model.apply(this, arguments);
      },
      parse: function(attrs) {
        this.subItems.set(attrs.subItems, {parse: true});
        return _.omit(attrs, 'subItems');
      }
    });

    var Items = Backbone.Collection.extend({
      model: Item
    });

    var data = {
      name: 'JobName',
      id: 1,
      items: [{
        id: 1,
        name: 'Sub1',
        subItems: [
          {id: 1, subName: 'One'},
          {id: 2, subName: 'Two'}
        ]
      }, {
        id: 2,
        name: 'Sub2',
        subItems: [
          {id: 3, subName: 'Three'},
          {id: 4, subName: 'Four'}
        ]
      }]
    };

    var newData = {
      name: 'NewJobName',
      id: 1,
      items: [{
        id: 1,
        name: 'NewSub1',
        subItems: [
          {id: 1,subName: 'NewOne'},
          {id: 2,subName: 'NewTwo'}
        ]
      }, {
        id: 2,
        name: 'NewSub2',
        subItems: [
          {id: 3,subName: 'NewThree'},
          {id: 4,subName: 'NewFour'}
        ]
      }]
    };

    var job = new Job(data, {parse: true});
    equal(job.get('name'), 'JobName');
    equal(job.items.at(0).get('name'), 'Sub1');
    equal(job.items.length, 2);
    equal(job.items.get(1).subItems.get(1).get('subName'), 'One');
    equal(job.items.get(2).subItems.get(3).get('subName'), 'Three');
    job.set(job.parse(newData, {parse: true}));
    equal(job.get('name'), 'NewJobName');
    equal(job.items.at(0).get('name'), 'NewSub1');
    equal(job.items.length, 2);
    equal(job.items.get(1).subItems.get(1).get('subName'), 'NewOne');
    equal(job.items.get(2).subItems.get(3).get('subName'), 'NewThree');
  });

  test('_addReference binds all collection events & adds to the lookup hashes', 9, function() {

    var calls = {add: 0, remove: 0};

    var Collection = Backbone.Collection.extend({

      _addReference: function(model) {
        Backbone.Collection.prototype._addReference.apply(this, arguments);
        calls.add++;
        equal(model, this._byId[model.id]);
        equal(model, this._byId[model.cid]);
        equal(model._events.all.length, 1);
      },

      _removeReference: function(model) {
        Backbone.Collection.prototype._removeReference.apply(this, arguments);
        calls.remove++;
        equal(this._byId[model.id], void 0);
        equal(this._byId[model.cid], void 0);
        equal(model.collection, void 0);
        equal(model._events, void 0);
      }

    });

    var collection = new Collection();
    var model = collection.add({id: 1});
    collection.remove(model);

    equal(calls.add, 1);
    equal(calls.remove, 1);

  });

  test('Do not allow duplicate models to be `add`ed or `set`', function() {
    var c = new Backbone.Collection();

    c.add([{id: 1}, {id: 1}]);
    equal(c.length, 1);
    equal(c.models.length, 1);

    c.set([{id: 1}, {id: 1}]);
    equal(c.length, 1);
    equal(c.models.length, 1);
  });

  test('#3020: #set with {add: false} should not throw.', 2, function() {
    var collection = new Backbone.Collection;
    collection.set([{id: 1}], {add: false});
    strictEqual(collection.length, 0);
    strictEqual(collection.models.length, 0);
  });

  test("create with wait, model instance, #3028", 1, function() {
    var collection = new Backbone.Collection();
    var model = new Backbone.Model({id: 1});
    model.sync = function(){
      equal(this.collection, collection);
    };
    collection.create(model, {wait: true});
  });

  test("modelId", function() {
    var Stooge = Backbone.Model.extend();
    var StoogeCollection = Backbone.Collection.extend({model: Stooge});

    // Default to using `Collection::model::idAttribute`.
    equal(StoogeCollection.prototype.modelId({id: 1}), 1);
    Stooge.prototype.idAttribute = '_id';
    equal(StoogeCollection.prototype.modelId({_id: 1}), 1);
  });

  test('Polymorphic models work with "simple" constructors', function () {
    var A = Backbone.Model.extend();
    var B = Backbone.Model.extend();
    var C = Backbone.Collection.extend({
      model: function (attrs) {
        return attrs.type === 'a' ? new A(attrs) : new B(attrs);
      }
    });
    var collection = new C([{id: 1, type: 'a'}, {id: 2, type: 'b'}]);
    equal(collection.length, 2);
    ok(collection.at(0) instanceof A);
    equal(collection.at(0).id, 1);
    ok(collection.at(1) instanceof B);
    equal(collection.at(1).id, 2);
  });

  test('Polymorphic models work with "advanced" constructors', function () {
    var A = Backbone.Model.extend({idAttribute: '_id'});
    var B = Backbone.Model.extend({idAttribute: '_id'});
    var C = Backbone.Collection.extend({
      model: Backbone.Model.extend({
        constructor: function (attrs) {
          return attrs.type === 'a' ? new A(attrs) : new B(attrs);
        },

        idAttribute: '_id'
      })
    });
    var collection = new C([{_id: 1, type: 'a'}, {_id: 2, type: 'b'}]);
    equal(collection.length, 2);
    ok(collection.at(0) instanceof A);
    equal(collection.at(0), collection.get(1));
    ok(collection.at(1) instanceof B);
    equal(collection.at(1), collection.get(2));

    C = Backbone.Collection.extend({
      model: function (attrs) {
        return attrs.type === 'a' ? new A(attrs) : new B(attrs);
      },

      modelId: function (attrs) {
        return attrs.type + '-' + attrs.id;
      }
    });
    collection = new C([{id: 1, type: 'a'}, {id: 1, type: 'b'}]);
    equal(collection.length, 2);
    ok(collection.at(0) instanceof A);
    equal(collection.at(0), collection.get('a-1'));
    ok(collection.at(1) instanceof B);
    equal(collection.at(1), collection.get('b-1'));
  });

  test("#3039: adding at index fires with correct at", 3, function() {
    var col = new Backbone.Collection([{at: 0}, {at: 4}]);
    col.on('add', function(model, col, options) {
      equal(model.get('at'), options.index);
    });
    col.add([{at: 1}, {at: 2}, {at: 3}], {at: 1});
  });

  test("#3039: index is not sent when at is not specified", 2, function() {
    var col = new Backbone.Collection([{at: 0}]);
    col.on('add', function(model, col, options) {
      equal(undefined, options.index);
    });
    col.add([{at: 1}, {at: 2}]);
  });

  test('#3199 - Order changing should trigger a sort', 1, function() {
      var one = new Backbone.Model({id: 1});
      var two = new Backbone.Model({id: 2});
      var three = new Backbone.Model({id: 3});
      var collection = new Backbone.Collection([one, two, three]);
      collection.on('sort', function() {
        ok(true);
      });
      collection.set([{id: 3}, {id: 2}, {id: 1}]);
  });

  test('#3199 - Adding a model should trigger a sort', 1, function() {
    var one = new Backbone.Model({id: 1});
    var two = new Backbone.Model({id: 2});
    var three = new Backbone.Model({id: 3});
    var collection = new Backbone.Collection([one, two, three]);
    collection.on('sort', function() {
      ok(true);
    });
    collection.set([{id: 3}, {id: 2}, {id: 1}, {id: 0}]);
  })

  test('#3199 - Order not changing should not trigger a sort', 0, function() {
    var one = new Backbone.Model({id: 1});
    var two = new Backbone.Model({id: 2});
    var three = new Backbone.Model({id: 3});
    var collection = new Backbone.Collection([one, two, three]);
    collection.on('sort', function() {
      ok(false);
    });
    collection.set([{id: 1}, {id: 2}, {id: 3}]);
  });

  test("add supports negative indexes", 1, function() {
    var collection = new Backbone.Collection([{id: 1}]);
    collection.add([{id: 2}, {id: 3}], {at: -1});
    collection.add([{id: 2.5}], {at: -2});
    equal(collection.pluck('id').join(','), "1,2,2.5,3");
  });

  test("#set accepts options.at as a string", 1, function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 2}]);
    collection.add([{id: 3}], {at: '1'});
    deepEqual(collection.pluck('id'), [1, 3, 2]);
  });
  test("adding multiple models triggers `update` event once", 1, function() {
    var collection = new Backbone.Collection;
    collection.on('update', function() { ok(true); });
    collection.add([{id: 1}, {id: 2}, {id: 3}]);
  });

  test("removing models triggers `update` event once", 1, function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 2}, {id: 3}]);
    collection.on('update', function() { ok(true); });
    collection.remove([{id: 1}, {id: 2}]);
  });

  test("remove does not trigger `set` when nothing removed", 0, function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 2}]);
    collection.on('update', function() { ok(false); });
    collection.remove([{id: 3}]);
  });

  test("set triggers `set` event once", 1, function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 2}]);
    collection.on('update', function() { ok(true); });
    collection.set([{id: 1}, {id: 3}]);
  });

  test("set does not trigger `update` event when nothing added nor removed", 0, function() {
    var collection = new Backbone.Collection([{id: 1}, {id: 2}]);
    collection.on('update', function() { ok(false); });
    collection.set([{id: 1}, {id: 2}]);
  });

  test("#3610 - invoke collects arguments", 3, function() {
    var Model = Backbone.Model.extend({
        method: function(a, b, c) {
            equal(a, 1);
            equal(b, 2);
            equal(c, 3);
        }
    });
    var Collection = Backbone.Collection.extend({
        model: Model
    });
    var collection = new Collection([{id: 1}]);
    collection.invoke('method', 1, 2, 3);
  });

})();
