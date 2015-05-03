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

            function backToMenu()
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
                game.stage.backgroundColor = 0xFF0000

                var title = game.add.text(game.world.centerX, game.world.centerY -50, 'bankruptr :(', { font: "50px press_start_kregular", fill: "#FCFCFC", align: "center" });
                title.anchor.setTo(0.5);

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);
            };
        };
    }
);