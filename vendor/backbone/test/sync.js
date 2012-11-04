$(document).ready(function() {

  var Library = Backbone.Collection.extend({
    url : function() { return '/library'; }
  });
  var library;

  var attrs = {
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
  };

  module("Backbone.sync", _.extend(new Environment, {

    setup : function() {
      Environment.prototype.setup.apply(this, arguments);
      library = new Library;
      library.create(attrs, {wait: false});
    },

    teardown: function() {
      Environment.prototype.teardown.apply(this, arguments);
      Backbone.emulateHTTP = false;
    }

  }));

  test("read", 4, function() {
    library.fetch();
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.type, 'GET');
    equal(this.ajaxSettings.dataType, 'json');
    ok(_.isEmpty(this.ajaxSettings.data));
  });

  test("passing data", 3, function() {
    library.fetch({data: {a: 'a', one: 1}});
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.data.a, 'a');
    equal(this.ajaxSettings.data.one, 1);
  });

  test("create", 6, function() {
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.type, 'POST');
    equal(this.ajaxSettings.dataType, 'json');
    var data = JSON.parse(this.ajaxSettings.data);
    equal(data.title, 'The Tempest');
    equal(data.author, 'Bill Shakespeare');
    equal(data.length, 123);
  });

  test("update", 7, function() {
    library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
    equal(this.ajaxSettings.url, '/library/1-the-tempest');
    equal(this.ajaxSettings.type, 'PUT');
    equal(this.ajaxSettings.dataType, 'json');
    var data = JSON.parse(this.ajaxSettings.data);
    equal(data.id, '1-the-tempest');
    equal(data.title, 'The Tempest');
    equal(data.author, 'William Shakespeare');
    equal(data.length, 123);
  });

  test("update with emulateHTTP and emulateJSON", 7, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
      emulateHTTP: true,
      emulateJSON: true
    });
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'POST');
    equal(this.ajaxSettings.dataType, 'json');
    equal(this.ajaxSettings.data._method, 'PUT');
    var data = JSON.parse(this.ajaxSettings.data.model);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
  });

  test("update with just emulateHTTP", 6, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
      emulateHTTP: true
    });
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'POST');
    equal(this.ajaxSettings.contentType, 'application/json');
    var data = JSON.parse(this.ajaxSettings.data);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
  });

  test("update with just emulateJSON", 6, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
      emulateJSON: true
    });
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'PUT');
    equal(this.ajaxSettings.contentType, 'application/x-www-form-urlencoded');
    var data = JSON.parse(this.ajaxSettings.data.model);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
  });

  test("read model", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().fetch();
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'GET');
    ok(_.isEmpty(this.ajaxSettings.data));
  });

  test("destroy", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().destroy({wait: true});
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'DELETE');
    equal(this.ajaxSettings.data, null);
  });

  test("destroy with emulateHTTP", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().destroy({
      emulateHTTP: true,
      emulateJSON: true
    });
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'POST');
    equal(JSON.stringify(this.ajaxSettings.data), '{"_method":"DELETE"}');
  });

  test("urlError", 2, function() {
    var model = new Backbone.Model();
    raises(function() {
      model.fetch();
    });
    model.fetch({url: '/one/two'});
    equal(this.ajaxSettings.url, '/one/two');
  });

  test("#1052 - `options` is optional.", 0, function() {
    var model = new Backbone.Model();
    model.url = '/test';
    Backbone.sync('create', model);
  });

  test("Backbone.ajax", 1, function() {
    Backbone.ajax = function(settings){
      strictEqual(settings.url, '/test');
    };
    var model = new Backbone.Model();
    model.url = '/test';
    Backbone.sync('create', model);
  });

  test("Call provided error callback on error.", 1, function() {
    var model = new Backbone.Model;
    model.url = '/test';
    Backbone.sync('read', model, {
      error: function() { ok(true); }
    });
    this.ajaxSettings.error();
  });

  test('Use Backbone.emulateHTTP as default.', 2, function() {
    var model = new Backbone.Model;
    model.url = '/test';

    Backbone.emulateHTTP = true;
    model.sync('create', model);
    strictEqual(this.ajaxSettings.emulateHTTP, true);

    Backbone.emulateHTTP = false;
    model.sync('create', model);
    strictEqual(this.ajaxSettings.emulateHTTP, false);
  });

  test('Use Backbone.emulateJSON as default.', 2, function() {
    var model = new Backbone.Model;
    model.url = '/test';

    Backbone.emulateJSON = true;
    model.sync('create', model);
    strictEqual(this.ajaxSettings.emulateJSON, true);

    Backbone.emulateJSON = false;
    model.sync('create', model);
    strictEqual(this.ajaxSettings.emulateJSON, false);
  });

  test("#1756 - Call user provided beforeSend function.", 4, function() {
    Backbone.emulateHTTP = true;
    var model = new Backbone.Model;
    model.url = '/test';
    var xhr = {
      setRequestHeader: function(header, value) {
        strictEqual(header, 'X-HTTP-Method-Override');
        strictEqual(value, 'DELETE');
      }
    };
    model.sync('delete', model, {
      beforeSend: function(_xhr) {
        ok(_xhr === xhr);
        return false;
      }
    });
    strictEqual(this.ajaxSettings.beforeSend(xhr), false);
  });

});
