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
                game.stage.backgroundColor = 0xffeecc;
                var ceo = game.add.image(0,0,'ceo');
                ceo.width *= 3;
                ceo.height *= 3;
                ceo.anchor.set(.5, .5);
                ceo.x = 300;
                ceo.y = game.height / 2;
                var text = game.add.text(0,0, gamedata.text);
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