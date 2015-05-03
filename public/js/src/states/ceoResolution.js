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

                var text = "Hey thanks for taking care of that for me. That's why I like surrounding myself with people smarter than me. \n" + 
                "Get back to that tech stuff, I'll order a pizza for you before I leave.";

                var text = game.add.text(0,0, gamedata.text, { font: "15px press_start_kregular", fill: 0x997755, align: "center" });
                text.x = ceo.x + ceo.width /2 + 20;
                text.y = ceo.y - ceo.height /2;
                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(startSprint);
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
