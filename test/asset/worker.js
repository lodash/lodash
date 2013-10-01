addEventListener('message', function(e) {
  if (e.data) {
    importScripts('../' + e.data);
    postMessage(_.VERSION);
  }
}, false);
