define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function ceoInit(game, gamedata) {
            var self     = this;
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
                var text  = game.add.text(0,0, ceoBegin, { font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
                var btn = game.add.button(0,0,'continue', startNextState, this);
            };

            function startNextState()
            {
                refreshState();
                game.state.start(nextGame);
            }

            function setUpMyShit() {

                var played = gamedata.miniGamesPlayed();
                if (played.length === miniGames.length) {
                    played = [];
                }
                var choices = [];
                for (var miniGame in miniGames) {
                    if (played.indexOf(miniGames[miniGame]) === -1) {
                        choices.push(miniGames[miniGame]);
                    }
                }
                var index = Math.floor(Math.random()*choices.length);
                played.push(index);
                nextGame  = choices[index];
                ceoBegin  = game.state.states[nextGame].initVals();
                gamedata.miniGamesPlayed(played);
            }

            function refreshState()
            {
                game.state.remove("CeoInit");
                var nextState = new ceoInit(game, gamedata);
                game.state.add("CeoInit", nextState);
            }
        };
    }
);
