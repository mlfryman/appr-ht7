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
                game.stage.backgroundColor = 0xcceeff;
                var ceo = game.add.image(0,0,'ceo');
                ceo.width *= 3;
                ceo.height *= 3;
                ceo.anchor.set(.5, .5);
                ceo.x = 300;
                ceo.y = game.height / 2;
                var text  = game.add.text(0,0, ceoBegin, { font: "15px press_start_kregular", fill: 0x334455, align: "center" });
                text.x = ceo.x + ceo.width /2 + 20;
                text.y = ceo.y - ceo.height /2;
                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(startNextState);
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
