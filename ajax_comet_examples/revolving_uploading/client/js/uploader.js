function Uploader(file, callbacks) {
  'use strict';

  var MAX_ERROR_COUNT = 6;
  var errorCount = 0;

  var startByte = 0;

  var xhrUpload = null;
  var xhrStatus = null;

  var fileId = file.name + '-' + file.size + '-' + file.lastModifiedDate;
  fileId = getHashCode(fileId);

  this.upload = function() {

  };

  this.pause = function() {

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
