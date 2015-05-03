define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function EmergencyIT(game) {
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
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var keyboard = game.add.button(0,0,'keyboard', errorFlash, this);
                keyboard.x = game.width/2 - keyboard.width/2 + 250;
                keyboard.y = game.height/2 - keyboard.height/2 - 300;

                monitor = game.add.image(0,0, 'monitor');
                monitor.width = 600;
                monitor.height = 400;
                monitor.x = game.width/2 - monitor.width/2 + 250;
                monitor.y = game.height/2 - monitor.height/2 + 100;

                var desktop = game.add.image(0,0, 'pc');
                desktop.x = game.width/2 - desktop.width/2 - 250;
                desktop.y = game.height/2 - desktop.height + 150;

                var bttn = game.add.button(0,0, 'powerbttn', bttnClick, this);
                bttn.width = 100;
                bttn.height = 100;
                bttn.x = 200;
                bttn.y = 200;

            };

            function lose()
            {
                game.state.start("LoseState");
            }
        };
    }
);