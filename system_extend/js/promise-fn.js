(function(global, globalExports) {
    'use strict';

    /* ES2015: Promise */
    var console = global.console;

    var MyPromiseFn = function f() {

        // Chrome 52 -> Uncaught TypeError: #<MyPromiseFn> is not a promise
        // Promise.apply(this, arguments);
        // Reflect.construct from ES2015 is working well
        var context = null;
        var bindArgArr = [ context ];
        var i;
        for (i = 0; i < arguments.length; ++i) {

            bindArgArr.push(arguments[i]);
        }
        var constructor = Function.prototype.bind.apply(Promise, bindArgArr);
        var promise = new constructor();

        Object.setPrototypeOf(promise, f.prototype);
        return promise;
    }

    globalExports.extendStaticProperties(MyPromiseFn, Promise);
    globalExports.extendPrototype(MyPromiseFn, Promise);
    MyPromiseFn.prototype.constructor = MyPromiseFn;

    MyPromiseFn.prototype.logResolvedValue = function() {

        this.then(function(value) { console.log(value); });
    };

    Object.defineProperties(globalExports, {

        MyPromiseFn: { value: MyPromiseFn, writable: false },
    });
})(this, this.globalExports = this.globalExports || {});
