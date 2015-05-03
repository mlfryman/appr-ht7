define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function LoseState(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [];
            var count = 0;

            function backToMenu(game)
            {
                game.state.start('menu');
            }

            self.update = function(game)
            { 

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
            };
        };
    }
);