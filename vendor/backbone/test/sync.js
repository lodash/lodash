$(document).ready(function() {

  var ajax = Backbone.ajax;
  var lastRequest = null;

  var Library = Backbone.Collection.extend({
    url : function() { return '/library'; }
  });
  var library;

  var attrs = {
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
  };

  module("Backbone.sync", {

    setup : function() {
      library = new Library();
      Backbone.ajax = function(obj) {
        lastRequest = obj;
      };
      library.create(attrs, {wait: false});
    },

    teardown: function() {
      Backbone.ajax = ajax;
    }

  });

  test("sync: read", 4, function() {
    library.fetch();
    equal(lastRequest.url, '/library');
    equal(lastRequest.type, 'GET');
    equal(lastRequest.dataType, 'json');
    ok(_.isEmpty(lastRequest.data));
  });

  test("sync: passing data", 3, function() {
    library.fetch({data: {a: 'a', one: 1}});
    equal(lastRequest.url, '/library');
    equal(lastRequest.data.a, 'a');
    equal(lastRequest.data.one, 1);
  });

  test("sync: create", 6, function() {
    equal(lastRequest.url, '/library');
    equal(lastRequest.type, 'POST');
    equal(lastRequest.dataType, 'json');
    var data = JSON.parse(lastRequest.data);
    equal(data.title, 'The Tempest');
    equal(data.author, 'Bill Shakespeare');
    equal(data.length, 123);
  });

  test("sync: update", 7, function() {
    library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
    equal(lastRequest.url, '/library/1-the-tempest');
    equal(lastRequest.type, 'PUT');
    equal(lastRequest.dataType, 'json');
    var data = JSON.parse(lastRequest.data);
    equal(data.id, '1-the-tempest');
    equal(data.title, 'The Tempest');
    equal(data.author, 'William Shakespeare');
    equal(data.length, 123);
  });

  test("sync: update with emulateHTTP and emulateJSON", 7, function() {
    Backbone.emulateHTTP = Backbone.emulateJSON = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'POST');
    equal(lastRequest.dataType, 'json');
    equal(lastRequest.data._method, 'PUT');
    var data = JSON.parse(lastRequest.data.model);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
    Backbone.emulateHTTP = Backbone.emulateJSON = false;
  });

  test("sync: update with just emulateHTTP", 6, function() {
    Backbone.emulateHTTP = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'POST');
    equal(lastRequest.contentType, 'application/json');
    var data = JSON.parse(lastRequest.data);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
    Backbone.emulateHTTP = false;
  });

  test("sync: update with just emulateJSON", 6, function() {
    Backbone.emulateJSON = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'PUT');
    equal(lastRequest.contentType, 'application/x-www-form-urlencoded');
    var data = JSON.parse(lastRequest.data.model);
    equal(data.id, '2-the-tempest');
    equal(data.author, 'Tim Shakespeare');
    equal(data.length, 123);
    Backbone.emulateJSON = false;
  });

  test("sync: read model", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().fetch();
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'GET');
    ok(_.isEmpty(lastRequest.data));
  });

  test("sync: destroy", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().destroy({wait: true});
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'DELETE');
    equal(lastRequest.data, null);
  });

  test("sync: destroy with emulateHTTP", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    Backbone.emulateHTTP = Backbone.emulateJSON = true;
    library.first().destroy();
    equal(lastRequest.url, '/library/2-the-tempest');
    equal(lastRequest.type, 'POST');
    equal(JSON.stringify(lastRequest.data), '{"_method":"DELETE"}');
    Backbone.emulateHTTP = Backbone.emulateJSON = false;
  });

  test("sync: urlError", 2, function() {
    var model = new Backbone.Model();
    raises(function() {
      model.fetch();
    });
    model.fetch({url: '/one/two'});
    equal(lastRequest.url, '/one/two');
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

});
