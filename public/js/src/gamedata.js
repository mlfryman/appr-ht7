define(
    [],
    function() {
        'use strict';

        /**
         * This class represents our global game data
         */
        return function GameData() {

            var self = this,
                phasesComplete = 0,
                startingFunding = 50,
                targetFunding = 100,
                funding = startingFunding,
                shares = 100;

            /**
             * Iterates the phasesComplete by one.
             *
             * @return void
             */
            self.completePhase = function() {
                phasesComplete++;
            };

            /**
             * Getter for phasesComplete
             *
             * @return number
             */
            self.phasesComplete = function() {
                return phasesComplete;
            };

            /**
             * Getter setter for funding
             *
             * @param number The amount by which to change funding.
             * @return number Current funding amount.
             */
            self.funding = function(delta) {
                if (typeof delta === 'number') {
                    funding += delta;
                    funding = clamp(0, funding, targetFunding);
                }
                return funding;
            };

            self.shares = function() {
                return shares;
            };

            /**
             * Sells a number of your shares.
             *
             * @return bool Whether or not you still own any part of your company.
             */
            self.sellShares = function(numShares) {
                shares -= numShares;
                funding = startingFunding;
                return shares > 0;
            };

            /**
             * True if you've reached the target funding.
             *
             * @return
             */
            self.won = function() {
                return funding >= targetFunding;
            };

            /**
             * True if you've reached the target funding.
             *
             * @return
             */
            self.lost = function() {
                return funding <= 0;
            };

            /**
             * Restricts val to the range min-max.
             *
             * @param number min The inclusive low-limit.
             * @param number val The value to restrict.
             * @param number max The inclusive high-limit.
             * @return number The clamped value.
             */
            function clamp(min, val, max) {
                if (min > val) {
                    return min;
                }
                if (max < val) {
                    return max;
                }
                return val;
            }

            /**
             * Returns the current funding progress.
             *
             * @return number The 0-1 percentage of progress.
             */
            self.progress = function() {
                return clamp(0, funding / targetFunding, 1);
            };
        };

    }
);
