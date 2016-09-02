/**
 * stringifyArrayAsync func implementation.
 */

/* global self, globalExports */

(function(global) {
    'use strict';

    const JSON = global.JSON;
    const performance = global.performance;

    /**
     * Count of timer tasks for array processing.
     * @type {number}
     */
    const PART_COUNT = 10;

    /**
     * Private stringifyArrayAsync func implementation.
     * --mutable--
     * @param {Array} dataArr
     * @param {?(function()|Array)} replacer
     * @param {{
     *  data: string,
     *  blockingTime: Array<number>,
     *  partLength: number
     * }} result
     * @return {Promise<{ data: string, blockingTime: Array<number> }>}
     */
    const stringifyArrayAsync = function f(dataArr, replacer, result) {

        const currentValueArr = dataArr.splice(0, result.partLength);
        if (currentValueArr.length) {

            const startBlockingTime = performance.now();
            const newData = JSON.stringify(currentValueArr, replacer);

            result.data = `${ result.data },${ newData.slice(1, -1) }`;
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
        const partLength = ((dataArr.length / PART_COUNT) | 0) + 1;
        return stringifyArrayAsync(dataArr.slice(), replacer, {

            data: '',
            blockingTime: [],
            partLength: partLength,
        });
    };
})(self);
