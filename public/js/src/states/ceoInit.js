define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function ceoInit(game, gamedata) {
            var self     = this;
            var played   = [];
            var ceoBegin = '';
            var nextGame = '';

            var miniGames = [
                "EmergencyIT",
                "KickStarter",
                "Cloud"
            ];

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
                setUpMyShit();
                var ceo = game.add.image(0,0,'ceo');
                ceo.anchor.set(.5, .5);
                ceo.x = 300;
                ceo.y = 200;
                text  = game.add.text(0,0, ceoBegin);
                var btn = game.add.button(0,0,'continue', startNextState, this);
            };

            function startNextState()
            {
                game.state.start(nextGame);
            }

            function setUpMyShit() {
                if (played.length === miniGames.length) {
                    played = new array();
                }
                var choices = array();
                for (var miniGame in miniGames) {
                    if (played.indexOf(miniGame) === -1) {
                        choices.push(miniGame);
                    }
                }
                var index = Math.floor(Math.random()*choices.length);
                played.push(index);
                nextGame  = choices[index];
                ceoBegin  = game.state.states[nextGame].initVals();
            }
        };
    }
);
