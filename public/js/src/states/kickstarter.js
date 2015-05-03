define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function KickStarter(game, gamedata) {
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
                gamedata.gameTimer(win);

                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var btn = game.add.button(0,0,'donate', donateNow, this);
                btn.anchor.set(.5,.5);
                btn.x = game.world.centerX;
                btn.y = game.world.centerY;
            };

            function win()
            {
                calculateMoney();
                game.state.start('CeoResolution');
            }

            function donateNow()
            {
                count++;
            }

            function calculateMoney()
            {
                var multiplier = (Math.floor(count/20)/10) + 1;
                gamedata.multiplier(multiplier);
            }

            function lose()
            {
                game.state.start('LoseState');
            }

            self.initVals = function () {
                return "Since our launch, people have been asking \n" +
                "what we're really doing. \n\n" +
                "We need to use that popular \n" +
                "crowd-funding thing to show everyone \n" +
                "about we're saving the world!";
            }

            function refreshState()
            {
                game.state.remove("KickStarter");
                var nextSprint = new KickStarter(game, gamedata);
                game.state.add("KickStarter", nextSprint);
            }
        };
    }
);
