$(document).ready(function() {

  var view;

  module("Backbone.View", {

    setup: function() {
      view = new Backbone.View({
        id        : 'test-view',
        className : 'test-view',
        other     : 'non-special-option'
      });
    }

  });

  test("constructor", 6, function() {
    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, void 0);
    equal(view.options.id, 'test-view');
    equal(view.options.className, 'test-view');
    equal(view.options.other, 'non-special-option');
  });

  test("jQuery", 1, function() {
    var view = new Backbone.View;
    view.setElement('<p><a><b>test</b></a></p>');
    strictEqual(view.$('a b').html(), 'test');
  });

  test("make", 3, function() {
    var div = view.make('div', {id: 'test-div'}, "one two three");

    equal(div.tagName.toLowerCase(), 'div');
    equal(div.id, 'test-div');
    equal($(div).text(), 'one two three');
  });

  test("make can take falsy values for content", 2, function() {
    var div = view.make('div', {id: 'test-div'}, 0);
    equal($(div).text(), '0');

    var div = view.make('div', {id: 'test-div'}, '');
    equal($(div).text(), '');
  });

  test("initialize", 1, function() {
    var View = Backbone.View.extend({
      initialize: function() {
        this.one = 1;
      }
    });

    strictEqual(new View().one, 1);
  });

  test("delegateEvents", 6, function() {
    var counter1 = 0, counter2 = 0;

    var view = new Backbone.View({el: '<p><a id="test"></a></p>'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click #test': 'increment'};

    view.delegateEvents(events);
    view.$('#test').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.$('#test').trigger('click');
    equal(counter1, 2);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('#test').trigger('click');
    equal(counter1, 3);
    equal(counter2, 3);
  });

  test("delegateEvents allows functions for callbacks", 3, function() {
    var view = new Backbone.View({el: '<p></p>'});
    view.counter = 0;

    var events = {
      click: function() {
        this.counter++;
      }
    };

    view.delegateEvents(events);
    view.$el.trigger('click');
    equal(view.counter, 1);

    view.$el.trigger('click');
    equal(view.counter, 2);

    view.delegateEvents(events);
    view.$el.trigger('click');
    equal(view.counter, 3);
  });

  test("undelegateEvents", 6, function() {
    var counter1 = 0, counter2 = 0;

    var view = new Backbone.View({el: '<p><a id="test"></a></p>'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click #test': 'increment'};

    view.delegateEvents(events);
    view.$('#test').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.undelegateEvents();
    view.$('#test').trigger('click');
    equal(counter1, 1);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('#test').trigger('click');
    equal(counter1, 2);
    equal(counter2, 3);
  });

  test("_ensureElement with DOM node el", 1, function() {
    var View = Backbone.View.extend({
      el: document.body
    });

    equal(new View().el, document.body);
  });

  test("_ensureElement with string el", 3, function() {
    var View = Backbone.View.extend({
      el: "body"
    });
    strictEqual(new View().el, document.body);

    View = Backbone.View.extend({
      el: "#testElement > h1"
    });
    strictEqual(new View().el, $("#testElement > h1").get(0));

    View = Backbone.View.extend({
      el: "#nonexistent"
    });
    ok(!new View().el);
  });

  test("with className and id functions", 2, function() {
    var View = Backbone.View.extend({
      className: function() {
        return 'className';
      },
      id: function() {
        return 'id';
      }
    });

    strictEqual(new View().el.className, 'className');
    strictEqual(new View().el.id, 'id');
  });

  test("with options function", 3, function() {
    var View1 = Backbone.View.extend({
      options: function() {
        return {
          title: 'title1',
          acceptText: 'confirm'
        }
      }
    });

    var View2 = View1.extend({
      options: function() {
        return _.extend(View1.prototype.options.call(this), {
          title: 'title2',
          fixed: true
        });
      }
    });

    strictEqual(new View2().options.title, 'title2');
    strictEqual(new View2().options.acceptText, 'confirm');
    strictEqual(new View2().options.fixed, true);
  });

  test("with attributes", 2, function() {
    var View = Backbone.View.extend({
      attributes: {
        id: 'id',
        'class': 'class'
      }
    });

    strictEqual(new View().el.className, 'class');
    strictEqual(new View().el.id, 'id');
  });

  test("with attributes as a function", 1, function() {
    var View = Backbone.View.extend({
      attributes: function() {
        return {'class': 'dynamic'};
      }
    });

    strictEqual(new View().el.className, 'dynamic');
  });

  test("multiple views per element", 3, function() {
    var count = 0;
    var $el = $('<p></p>');

    var View = Backbone.View.extend({
      el: $el,
      events: {
        click: function() {
          count++;
        }
      }
    });

    var view1 = new View;
    $el.trigger("click");
    equal(1, count);

    var view2 = new View;
    $el.trigger("click");
    equal(3, count);

    view1.delegateEvents();
    $el.trigger("click");
    equal(5, count);
  });

  test("custom events, with namespaces", 2, function() {
    var count = 0;

    var View = Backbone.View.extend({
      el: $('body'),
      events: function() {
        return {"fake$event.namespaced": "run"};
      },
      run: function() {
        count++;
      }
    });

    var view = new View;
    $('body').trigger('fake$event').trigger('fake$event');
    equal(count, 2);

    $('body').unbind('.namespaced');
    $('body').trigger('fake$event');
    equal(count, 2);
  });

  test("#1048 - setElement uses provided object.", 2, function() {
    var $el = $('body');

    var view = new Backbone.View({el: $el});
    ok(view.$el === $el);

    view.setElement($el = $($el));
    ok(view.$el === $el);
  });

  test("#986 - Undelegate before changing element.", 1, function() {
    var button1 = $('<button></button>');
    var button2 = $('<button></button>');

    var View = Backbone.View.extend({
      events: {
        click: function(e) {
          ok(view.el === e.target);
        }
      }
    });

    var view = new View({el: button1});
    view.setElement(button2);

    button1.trigger('click');
    button2.trigger('click');
  });

  test("#1172 - Clone attributes object", 2, function() {
    var View = Backbone.View.extend({
      attributes: {foo: 'bar'}
    });

    var view1 = new View({id: 'foo'});
    strictEqual(view1.el.id, 'foo');

    var view2 = new View();
    ok(!view2.el.id);
  });

  test("#1228 - tagName can be provided as a function", 1, function() {
    var View = Backbone.View.extend({
      tagName: function() {
        return 'p';
      }
    });

    ok(new View().$el.is('p'));
  });

  test("dispose", 0, function() {
    var View = Backbone.View.extend({
      events: {
        click: function() { ok(false); }
      },
      initialize: function() {
        this.model.on('all x', function(){ ok(false); }, this);
        this.collection.on('all x', function(){ ok(false); }, this);
      }
    });

    var view = new View({
      model: new Backbone.Model,
      collection: new Backbone.Collection
    });

    view.dispose();
    view.model.trigger('x');
    view.collection.trigger('x');
    view.$el.click();
  });

  test("dispose with non Backbone objects", 0, function() {
    var view = new Backbone.View({model: {}, collection: {}});
    view.dispose();
  });

  test("view#remove calls dispose.", 1, function() {
    var view = new Backbone.View();

    view.dispose = function() { ok(true); };
    view.remove();
  });

  test("Provide function for el.", 1, function() {
    var View = Backbone.View.extend({
      el: function() {
        return "<p><a></a></p>";
      }
    });

    var view = new View;
    ok(view.$el.is('p:has(a)'));
  });

  test("events passed in options", 2, function() {
    var counter = 0;

    var View = Backbone.View.extend({
      el: '<p><a id="test"></a></p>',
      increment: function() {
        counter++;
      }
    });
    
    var view = new View({events:{'click #test':'increment'}});
    var view2 = new View({events:function(){
      return {'click #test':'increment'};
    }});
    
    view.$('#test').trigger('click');
    view2.$('#test').trigger('click');
    equal(counter, 2);
    
    view.$('#test').trigger('click');
    view2.$('#test').trigger('click');
    equal(counter, 4);
  });

});
