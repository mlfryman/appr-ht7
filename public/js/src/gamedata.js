define(
    [],
    function() {
        'use strict';

        /**
         * This class represents our global game data
         */
        return function GameData(game) {

            var self = this,
                phasesComplete = 0,
                startingFunding = 50,
                targetFunding = 100,
                funding = startingFunding,
                shares = 100,
                multiplier = 1,
                appName = '',
                time,
                gameTimerDisplay,
                bank,
                seenGames = [];

            self.startingFunding = function() {
                return startingFunding;
            }

            self.initFunding = function() {
                funding = startingFunding;
            }

            /**
             * Creates global timer.
             *
             * @param int
             * @return void
             */
            self.gameTimer = function(cb, _time) {
                _time = typeof _time === 'undefined' ? 10 : _time;
                console.log('Time: ' + _time);
                gameTimerDisplay = game.add.text(game.world.centerX, 100, 'Time: ' + time, { font: '12px Arial', fill: '#ffffff', align: 'center' });
                game.time.events.add(Phaser.Timer.SECOND * _time, cb, this);
                game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
            };

            /**
             * Decrement the timer by one.
             *
             * @return void
             */
            function updateTimer() {
                console.log('updateTimer() - time: ' + time);
                time--;
                gameTimerDisplay.setText('gameTimerDisplay - Time: ' + time);
            }

            function lose() {
                game.state.start('LoseState');
            }


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

            self.multiplier = function(newMultiplier) {
                if (typeof multiplier != "undefined") {
                    multiplier = newMultiplier;
                }

                return multiplier;
            }

            self.appName = function(newAppName) {
                if (typeof appName != "undefined") {
                    appName = newAppName;
                }

                return appName;
            }

            self.bankDelta = function(delta)
            {
                if (typeof delta === 'number') {
                    bank += delta;
                    bank = clamp(0, bank, 99999999999999);
                }

                return bank;
            };

            self.tragetFundingIncrement = function() {
                targetFunding = Math.floor(targetFunding * 1.1);
            }

            self.miniGamesPlayed = function (data) {
                if (typeof data != "undefined") {
                    seenGames = data;
                }

                return seenGames;
            }
        };
    }
);
