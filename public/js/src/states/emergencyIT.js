define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function EmergencyIT(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [];
            var monitor;        
            var text;
            var timer = 0;
            var times = 0;

            function backToMenu()
            {
                game.state.start('menu');
            }

            var clickCount = 0;
            function bttnClick()
            {
                if (clickCount >= 1) {
                    restartingFlash();
                    setTimeout(win, 2000);
                }

                if (clickCount < 1) {
                    shuttingDownFlash();
                    clickCount++;
                }
            }

            function win()
            {
                refreshState();
                game.state.start("CeoResolution");
            }


            function setText(message, color)
            {
                text = game.add.text(0,0, message, color);
                text.anchor.set(.5, .5);
                text.x = monitor.x + monitor.width/2;
                text.y = monitor.y + monitor.height/2; 
            }

            function errorFlash()
            {
                if (typeof text !== 'undefined') {
                   text.kill();
                   text  = undefined; 
                }
                setText("ERROR!", {fill: "#ff0000"});
            }

            function shuttingDownFlash()
            {
                setText("shutting Down...", {fill: "#00ff00"});
            }

            function restartingFlash()
            {
                setText("Booting Up....", {fill: "#00ff00"});
            }


            self.update = function(game)
            {
                if (typeof text !== 'undefined') {
                    if (times >= 1) {
                        text.kill();
                        text = undefined;
                        times = 0;
                    } else {
                        timer += game.time.elapsed; //this is in ms, not seconds.
                        if (timer >= 1000 ) {
                            timer = 0;
                            text.visible = !text.visible;
                            times++;
                        } 
                    }
                }
            };

            self.render = function()
            {

            };

            self.create = function(game)
            {
                gamedata.gameTimer(lose);

                game.stage.backgroundColor = 0x4466aa;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                monitor = game.add.image(0,0, 'monitor');
                monitor.width *= 5;
                monitor.height *= 5;
                monitor.x = game.width/2 - monitor.width;
                monitor.y = game.height/2 - monitor.height/2;

                var keyboard = game.add.button(0,0,'keyboard', errorFlash, this);

                keyboard.width *= 5;
                keyboard.height *= 5;

                keyboard.x = game.width/2 - keyboard.width/2 - monitor.width/2;
                keyboard.y = game.height/2 - keyboard.height/2 + monitor.height/2;

                var desktop = game.add.button(0, 0, 'pc', bttnClick, this);

                desktop.width *= 5;
                desktop.height *= 5;

                desktop.x = game.width/2 - desktop.width + monitor.width/2 + 10;;
                desktop.y = game.height/2 - desktop.height/2;
                
                var mod = (monitor.width) / 2;
                desktop.x += mod;
                monitor.x += mod;
                keyboard.x += mod;
                /*
                var bttn = game.add.button(0,0, 'powerbttn', bttnClick, this);
                bttn.width = 100;
                bttn.height = 100;
                bttn.x = 200;
                bttn.y = 200;*/

            };

            function lose()
            {
                refreshState();
                game.state.start("LoseState");
            }

            self.initVals = function () {
                return "this is the init text";
            }

            function refreshState()
            {
                game.state.remove("EmergencyIT");
                var nextSprint = new EmergencyIT(game, gamedata);
                game.state.add("EmergencyIT", nextSprint);
            }
        };
    }
);