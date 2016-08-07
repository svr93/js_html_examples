(function(global, globalExports) {
    'use strict';

    function extendStaticProperties(target, source) {

        Object.getOwnPropertyNames(source).forEach(function(name) {

            if (target.hasOwnProperty(name)) { return; }
            target[name] = source[name];
        });
    }

    function extendPrototype(target, source) {

        var sourceProto = source.prototype;
        var targetProto = target.prototype;
        Object.getOwnPropertyNames(sourceProto).forEach(function(name) {

            if (target.hasOwnProperty(name)) { return; }
            if (typeof sourceProto[name] === 'function') {

                targetProto[name] = function() {

                    var result = sourceProto[name].apply(this, arguments);
                    if (Object.getPrototypeOf(result) === sourceProto) {

                        Object.setPrototypeOf(result, targetProto);
                    }
                    return result;
                };
                return;
            }
            targetProto[name] = sourceProto[name];
        });
    }

    Object.defineProperties(globalExports, {

        extendStaticProperties: {

            value: extendStaticProperties,
            writable: false,
        },
        extendPrototype: {

            value: extendPrototype,
            writable: false,
        },
    });
})(this, this.globalExports = this.globalExports || {});
