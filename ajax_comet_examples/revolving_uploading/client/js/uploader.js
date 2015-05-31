function Uploader(file, callbacks) {
  'use strict';

  var MAX_ERROR_COUNT = 6;
  var errorCount = 0;

  var startByte = 0;

  var xhrUpload = null;
  var xhrStatus = null;

  var DELAY_TIME_COEFF = 1000;

  var fileId = file.name + '-' + file.size + '-' + file.lastModifiedDate;
  fileId = getHashCode(fileId);

  this.upload = function() {
    xhrStatus = new XMLHttpRequest(); // receiving startByte info

    xhrStatus.onload = xhrStatus.onerror = function() {

      if (this.status == 200) {
        startByte = +this.responseText || 0; // 0 in case of "0" or bad resText

        send();
        return;
      }

      if (++errorCount <= MAX_ERROR_COUNT) {
        setTimeout(upload, DELAY_TIME_COEFF * errorCount);
        return;
      }

      callbacks.onFail(this.statusText);
    };

    xhrStatus.open('GET', '/status');
    xhrStatus.setRequestHeader('X-File-Id', fileId);
    xhrStatus.send();
  };

  function send() {
    xhrUpload = new XMLHttpRequest(); // file uploading

    xhrUpload.onload = xhrUpload.onerror = function() {

      if (this.status == 200) {
        callbacks.onSuccess();
        return;
      }

      if (++errorCount <= MAX_ERROR_COUNT) {
        setTimeout(send, DELAY_TIME_COEFF * errorCount);
        return;
      }

      callbacks.onFail(this.statusText);
    };

    xhrUpload.upload.onprogress = function(evt) {
      callbacks.onProgress(startByte + evt.loaded, startByte + evt.total);
    };

    xhrUpload.open('POST', '/upload');
    xhrUpload.setRequestHeader('X-File-Id', fileId);
    xhrUpload.send(file.slice(startByte));
  }

  this.pause = function() {
    xhrStatus && xhrStatus.abort();
    xhrUpload && xhrUpload.abort();
  };

  function getHashCode(fileId) {
    var SHIFT = 5;

    var chr = null;
    var hash = 0;

    for (var i = 0; i < fileId.length; ++i) {
      chr = fileId.charCodeAt(i);

      hash = ((hash << SHIFT) - hash) + chr;
    }

    return hash | 0; // convert to 32bit integer
  }
}
