(function() {

  var Environment = this.Environment = function(){};

  _.extend(Environment.prototype, {

    ajax: Backbone.ajax,

    sync: Backbone.sync,

    setup: function() {
      var env = this;

      // Capture ajax settings for comparison.
      Backbone.ajax = function(settings) {
        env.ajaxSettings = settings;
      };

      // Capture the arguments to Backbone.sync for comparison.
      Backbone.sync = function(method, model, options) {
        env.syncArgs = {
          method: method,
          model: model,
          options: options
        };
        env.sync.apply(this, arguments);
      };
    },

    teardown: function() {
      this.syncArgs = null;
      this.ajaxSettings = null;
      Backbone.sync = this.sync;
      Backbone.ajax = this.ajax;
    }

  });

})();
