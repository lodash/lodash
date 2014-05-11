addEventListener('message', function(e) {
  if (e.data) {
    try {
      importScripts('../' + e.data);
    } catch(e) {
      self._ = {};
    }
    postMessage(_.VERSION);
  }
}, false);
