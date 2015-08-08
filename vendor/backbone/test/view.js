(function() {

  var view;

  module("Backbone.View", {

    setup: function() {
      $('#qunit-fixture').append(
        '<div id="testElement"><h1>Test</h1></div>'
      );

      view = new Backbone.View({
        id        : 'test-view',
        className : 'test-view',
        other     : 'non-special-option'
      });
    }

  });

  test("constructor", 3, function() {
    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, void 0);
  });

  test("$", 2, function() {
    var view = new Backbone.View;
    view.setElement('<p><a><b>test</b></a></p>');
    var result = view.$('a b');

    strictEqual(result[0].innerHTML, 'test');
    ok(result.length === +result.length);
  });

  test("$el", 3, function() {
    var view = new Backbone.View;
    view.setElement('<p><a><b>test</b></a></p>');
    strictEqual(view.el.nodeType, 1);

    ok(view.$el instanceof Backbone.$);
    strictEqual(view.$el[0], view.el);
  });

  test("initialize", 1, function() {
    var View = Backbone.View.extend({
      initialize: function() {
        this.one = 1;
      }
    });

    strictEqual(new View().one, 1);
  });

  test("render", 1, function() {
    var view = new Backbone.View;
    equal(view.render(), view, '#render returns the view instance');
  });

  test("delegateEvents", 6, function() {
    var counter1 = 0, counter2 = 0;

    var view = new Backbone.View({el: '#testElement'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.$('h1').trigger('click');
    equal(counter1, 2);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 3);
    equal(counter2, 3);
  });

  test("delegate", 3, function() {
    var view = new Backbone.View({el: '#testElement'});
    view.delegate('click', 'h1', function() {
      ok(true);
    });
    view.delegate('click', function() {
      ok(true);
    });
    view.$('h1').trigger('click');

    equal(view.delegate(), view, '#delegate returns the view instance');
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


  test("delegateEvents ignore undefined methods", 0, function() {
    var view = new Backbone.View({el: '<p></p>'});
    view.delegateEvents({'click': 'undefinedMethod'});
    view.$el.trigger('click');
  });

  test("undelegateEvents", 7, function() {
    var counter1 = 0, counter2 = 0;

    var view = new Backbone.View({el: '#testElement'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.undelegateEvents();
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 2);
    equal(counter2, 3);

    equal(view.undelegateEvents(), view, '#undelegateEvents returns the view instance');
  });

  test("undelegate", 1, function() {
    view = new Backbone.View({el: '#testElement'});
    view.delegate('click', function() { ok(false); });
    view.delegate('click', 'h1', function() { ok(false); });

    view.undelegate('click');

    view.$('h1').trigger('click');
    view.$el.trigger('click');

    equal(view.undelegate(), view, '#undelegate returns the view instance');
  });

  test("undelegate with passed handler", 1, function() {
    view = new Backbone.View({el: '#testElement'});
    var listener = function() { ok(false); };
    view.delegate('click', listener);
    view.delegate('click', function() { ok(true); });
    view.undelegate('click', listener);
    view.$el.trigger('click');
  });

  test("undelegate with selector", 2, function() {
    view = new Backbone.View({el: '#testElement'});
    view.delegate('click', function() { ok(true); });
    view.delegate('click', 'h1', function() { ok(false); });
    view.undelegate('click', 'h1');
    view.$('h1').trigger('click');
    view.$el.trigger('click');
  });

  test("undelegate with handler and selector", 2, function() {
    view = new Backbone.View({el: '#testElement'});
    view.delegate('click', function() { ok(true); });
    var handler = function(){ ok(false); };
    view.delegate('click', 'h1', handler);
    view.undelegate('click', 'h1', handler);
    view.$('h1').trigger('click');
    view.$el.trigger('click');
  });

  test("tagName can be provided as a string", 1, function() {
    var View = Backbone.View.extend({
      tagName: 'span'
    });

    equal(new View().el.tagName, 'SPAN');
  });

  test("tagName can be provided as a function", 1, function() {
    var View = Backbone.View.extend({
      tagName: function() {
        return 'p';
      }
    });

    ok(new View().$el.is('p'));
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

  test("custom events", 2, function() {
    var View = Backbone.View.extend({
      el: $('body'),
      events: {
        "fake$event": function() { ok(true); }
      }
    });

    var view = new View;
    $('body').trigger('fake$event').trigger('fake$event');

    $('body').off('fake$event');
    $('body').trigger('fake$event');
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

  test("views stopListening", 0, function() {
    var View = Backbone.View.extend({
      initialize: function() {
        this.listenTo(this.model, 'all x', function(){ ok(false); });
        this.listenTo(this.collection, 'all x', function(){ ok(false); });
      }
    });

    var view = new View({
      model: new Backbone.Model,
      collection: new Backbone.Collection
    });

    view.stopListening();
    view.model.trigger('x');
    view.collection.trigger('x');
  });

  test("Provide function for el.", 2, function() {
    var View = Backbone.View.extend({
      el: function() {
        return "<p><a></a></p>";
      }
    });

    var view = new View;
    ok(view.$el.is('p'));
    ok(view.$el.has('a'));
  });

  test("events passed in options", 1, function() {
    var counter = 0;

    var View = Backbone.View.extend({
      el: '#testElement',
      increment: function() {
        counter++;
      }
    });

    var view = new View({
      events: {
        'click h1': 'increment'
      }
    });

    view.$('h1').trigger('click').trigger('click');
    equal(counter, 2);
  });

  test("remove", 2, function() {
    var view = new Backbone.View;
    document.body.appendChild(view.el);

    view.delegate('click', function() { ok(false); });
    view.listenTo(view, 'all x', function() { ok(false); });

    equal(view.remove(), view, '#remove returns the view instance');
    view.$el.trigger('click');
    view.trigger('x');

    // In IE8 and below, parentNode still exists but is not document.body.
    notEqual(view.el.parentNode, document.body);
  });

  test("setElement", 3, function() {
    var view = new Backbone.View({
      events: {
        click: function() { ok(false); }
      }
    });
    view.events = {
      click: function() { ok(true); }
    };
    var oldEl = view.el;
    var $oldEl = view.$el;

    view.setElement(document.createElement('div'));

    $oldEl.click();
    view.$el.click();

    notEqual(oldEl, view.el);
    notEqual($oldEl, view.$el);
  });

})();
