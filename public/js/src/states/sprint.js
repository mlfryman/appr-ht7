define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function Sprint() {
            var self = this,
                cGroup,
                collectibles = [];

            function backToMenu(game)
            {
                game.state.start('menu');
            }

            function addCollectible(game)
            {

                var collectible = cGroup.create(0, -100, 'collectible', 0);

                collectible.x = (game.width - collectible.width) * Math.random();
                collectible.y = -collectible.height;
                collectible.velocity = {x: Math.random() * 10 - 5, y: game.height / 50, r: .2 * Math.random() - .1};
                collectibles.push(collectible);

            }

            function updateCollectible(collectible, game)
            {
                if (collectible.x < 0) {
                    collectible.x = 0;
                    if (collectible.velocity.x < 0) {
                        collectible.velocity.x = -collectible.velocity.x;
                    }
                }

                if (collectible.x > game.width - collectible.width) {
                    collectible.x = game.width - collectible.width;
                    if(collectible.velocity.x > 0) {
                        collectible.velocity.x = - collectible.velocity.x;
                    }
                }

                collectible.anchor.setTo(.5, .5);

                collectible.x += collectible.velocity.x;
                collectible.y += collectible.velocity.y;

                collectible.rotation += collectible.velocity.r;

                if (collectible.y > game.height + collectible.height) {
                    collectible.kill();
                    removeFromArray(collectibles, collectible);
                }
            }

            function removeFromArray(array, member) {
                for (var i in array) {
                    if (array[i] === member) {
                        delete array[i];
                    }
                }
            }

            var timer = 0;
            var interval = 20;
            self.update = function(game)
            {
                timer += game._deltaTime;
                if (timer > interval) {
                    addCollectible(game);
                    interval = Math.random() * 20;
                    timer = 0;
                }

                for (var i in collectibles) {
                    updateCollectible(collectibles[i], game);
                }
            };

            self.render = function()
            {

            };

            self.create = function(game)
            {
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                if (typeof cGroup === 'undefined') {
                    cGroup = game.add.group();
                    cGroup.enableBody = true;
                    cGroup.physicsBodyType = Phaser.Physics.ARCADE;
                }
            };
        };
    }
);