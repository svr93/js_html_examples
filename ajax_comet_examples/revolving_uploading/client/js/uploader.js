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

  }
}
