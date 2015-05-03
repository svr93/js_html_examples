function CoffeeMachine(power) {
  'use strict';

  Machine.apply(this, arguments);

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

  function onReady() {
    alert('Кофе готов!');
  }

  this.run = function() {
    setTimeout(onReady, 1000);
  };

}
