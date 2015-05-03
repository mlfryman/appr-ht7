define(
    ['Phaser'],
    function(Phaser) {
        'use strict';

        return function DrunkCoding(game, gamedata)
        {

            var bottle,
                pi = Math.PI,
                bottleRV = .001,
                self = this,
                vel = 0,
                maxVel = 12,
                rightDown = false,
                leftDown = false;

            self.update = function()
            {
                updateVelocity();
                updateRotationalVelocity();
                updateBottle();
            };

            function updateVelocity()
            {
                if (leftDown) {
                    vel -= 3;
                } else if (vel < 0) {
                    vel += 1;
                }

                if (rightDown) {
                    vel += 3;
                } else if (vel > 0) {
                    vel -= 1;
                }

                vel = clamp(-maxVel, vel, maxVel);
            }

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

            function updateBottle()
            {
                bottle.x += vel;
                bottle.rotation += bottleRV;
                bottle.rotation = bottle.rotation % (2 * pi);
            }

            function updateRotationalVelocity()
            {
                var mapped = mapRotation(bottle.rotation);
                var weightedMap = 1 - Math.abs(Math.abs(mapped) - .5) * 2;
                var mod = .005 * weightedMap;

                if (mapped > 0) {
                    bottleRV -= mod;
                    if (bottleRV > 0) {
                        bottleRV -= mod / 2.5;
                    }
                } else if (mapped < 0) {
                    bottleRV += mod;
                    if (bottleRV < 0) {
                        bottleRV += mod / 2.5;
                    }
                }

                var velmod = vel / 8000;

                if (Math.abs(mapped) > .5) {
                    bottleRV -= velmod;
                } else {
                    bottleRV += velmod;
                }

                bottleRV = clamp(-.2, bottleRV, .2);
            }

            function mapRotation(rotation) {
                return (rotation - pi) / pi;
            }

            self.create = function()
            {
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                bottle = game.add.sprite(0, 0, 'bottle');

                bottle.width *= .1;
                bottle.height *= .1;

                bottle.anchor.set(.5, .8);

                bottle.x = game.width / 2;
                bottle.y = game.height / 2;

                var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

                right.onDown.add(function() {rightDown = true; });
                right.onUp.add(function() {rightDown = false; });

                left.onDown.add(function() {leftDown = true; });
                left.onUp.add(function() {leftDown = false; });

            };

        };
    }
);
