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

                var collectible = cGroup.create(game.world.randomX, -100, 'collectible', 0);

                collectible.velocity = {x: Math.random() * 10 - 5, y: game.height / 50};
                collectibles.push(collectible);

            }

            function updateCollectible(collectible, game)
            {
                collectible.x += collectible.velocity.x;
                collectible.y += collectible.velocity.y;

                if (collectible.y > game.height) {
                    collectible.kill();
                }
            }

            var timer = 0;
            var interval = 20;
            self.update = function(game)
            {
                timer += game._deltaTime;
                if (timer > interval) {
                    addCollectible(game);
                    interval = Math.random() * 500;
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
