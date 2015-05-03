function Machine(power) {
  'use strict';

  this._enabled = false;

  this.enable = function() {
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };

}
