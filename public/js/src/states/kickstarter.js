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

                game.stage.backgroundColor = 0x88ffcc

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var btn = game.add.button(0,0,'monitor', donateNow, this);

                btn.width *= 8;
                btn.height *= 8;

                btn.frame = 8;

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
                return "this is the init text";
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
