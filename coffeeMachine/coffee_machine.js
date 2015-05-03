function CoffeeMachine(power) {
  'use strict';

  Machine.apply(this, arguments);

  var waterAmount = 0;
  var timerId = null;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

  function onReady() {
    alert('Кофе готов!');
  }

  this.run = function() {

    if (!this._enabled) {
      throw new Error('Ошибка: кофеварка выключена!');
    }

    timerId = setTimeout(onReady, 1000);
  };

  var parentDisable = this.disable;

  this.disable = function() {
    clearTimeout(timerId);
    
    parentDisable.apply(this, arguments);
  };

}
