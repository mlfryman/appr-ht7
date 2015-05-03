define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function ceoResolution(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [];

            function backToMenu(game)
            {
                game.state.start('menu');
            }

            self.render = function()
            {

            };

            self.create = function(game)
            {
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var ceo = game.add.image(0,0,'ceo');
                ceo.anchor.set(.5, .5);
                ceo.x = 300;
                ceo.y = 200;
                var text = game.add.text(0,0, gamedata.text, { font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
                var btn = game.add.button(0,0,'continue', startSprint, this);
            };

            function startSprint()
            {
                refreshState();
                game.state.start("Sprint");
            }

            function refreshState()
            {
                game.state.remove("CeoResolution");
                var nextState = new ceoResolution(game, gamedata);
                game.state.add("CeoResolution", nextState);
            }
        };
    }
);
