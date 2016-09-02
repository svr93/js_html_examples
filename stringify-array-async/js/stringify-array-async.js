/**
 * stringifyArrayAsync func implementation.
 */

/* global self, globalExports */

(function(global) {
    'use strict';

    const JSON = global.JSON;
    const performance = global.performance;

    /**
     * Private stringifyArrayAsync func implementation.
     * @param {Array} dataArr
     * @param {?(function()|Array)} replacer
     * @param {{ data: string, blockingTime: Array<number> }} result
     * @return {Promise<{ data: string, blockingTime: Array<number> }>}
     */
    const stringifyArrayAsync = function f(dataArr, replacer, result) {

        const currentValue = dataArr.pop();
        if (currentValue) {

            const startBlockingTime = performance.now();
            const newData = JSON.stringify(currentValue, replacer);

            result.data = `${ result.data },${ newData }`;
            result.blockingTime.push(performance.now() - startBlockingTime);

            return new Promise((resolve) => {

                setTimeout(() => resolve(f.apply(null, arguments)), 0);
            });
        }
        return Promise.resolve({

            data: `[${ result.data.slice(1) }]`,
            blockingTime: result.blockingTime,
        });
    };

    /**
     * Makes JSON string from array asynchronously.
     * @param {Array} dataArr
     * @param {(function()|Array)=} replacer
     * @return {Promise<{ data: string, blockingTime: Array<number> }>}
     */
    globalExports.stringifyArrayAsync = function(dataArr, replacer) {

        if (!(dataArr instanceof Array)) {

            return Promise.resolve({ data: '[]', blockingTime: [] });
        }
        if (!(replacer instanceof Function || replacer instanceof Array)) {

            replacer = null;
        }
        return stringifyArrayAsync(dataArr, replacer, {

            data: '',
            blockingTime: [],
        });
    };
})(self);
