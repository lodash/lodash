self.console || (self.console = { 'log': function() {} });

addEventListener('message', function(e) {
  if (e.data) {
    try {
      importScripts('../' + e.data);
    } catch (e) {
      self._ = { 'VERSION': e.message };
    }
    postMessage(_.VERSION);
  }
}, false);
