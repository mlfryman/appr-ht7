define(
    [
        'Phaser',
        'icons'
    ],
    function(Phaser, icons) {
        'use strict';

        return function Menu(game, gamedata) {

            var self = this,
                themeMusic,
                sprintMusic,
                miniMusic,
                collectSound;

            self.preload = function() {
                game.load.image('bg_menu',   'assets/img/starwars_bg.png');

                //- Sprint Assets
                game.load.image('sprite_player', 'assets/img/app_folder.png');
                icons.each(function(icon, index){
                    game.load.image('collectible' + index, 'assets/img/icons/' + icon + '.png');
                });

                game.load.image('progress_border', 'assets/img/progress_border.png');
                game.load.image('progress_bar', 'assets/img/progress_bar.png');

                //- Emergency IT Minigame Assets
                game.load.image('keyboard', 'assets/img/keyboard.png');
                game.load.spritesheet('monitor', 'assets/img/monitor_spritesheet.png', 53, 51);
                game.load.spritesheet('pc', 'assets/img/tower_spritesheet.png', 27, 51);

                //- CEO Assets
                game.load.image('ceo', 'assets/img/ceo.png');

                //- Cloud Minigame Assets
                game.load.spritesheet('nimbus', 'assets/img/cloud2.png', 58, 36);
                game.load.image('app', 'assets/img/app_folder.png');

                //- Audio files
                game.load.audio('themeMusic', 'assets/audio/main_theme.mp3');
                game.load.audio('sprintMusic', 'assets/audio/ark_theme.mp3');
                game.load.audio('miniMusic', 'assets/audio/rock_theme.mp3');
                game.load.audio('collectSound', 'assets/audio/key.wav');

            };

            self.update = function() {

            };

            var bgInterval,
                color = 0x000000;
            function manageBackground(){
                var then = Date.now();
                bgInterval = setInterval(function() {
                    var now = Date.now(),
                        delta = now - then;

                    game.stage.backgroundColor = color++;

                    now = then;

                }, 10);
            }

            function stopBackground(){
                clearInterval(bgInterval);
            }

            self.create = function() {

                themeMusic = game.add.audio('themeMusic', 1, true);
                themeMusic.play();

                manageBackground();

                /*var background = game.add.sprite(0, 0, 'bg_menu');
                background.width = game.width;
                background.height = game.height;*/

                var title = game.add.text(game.world.centerX, game.world.centerY -50, 'appr', { font: "100px press_start_kregular", fill: "#FCFCFC", align: "center" });
                title.anchor.setTo(0.5);

                var instructions = game.add.text(game.world.centerX, game.world.centerY + 50, 'Press SPACE to play', { font: "20px press_start_kregular", fill: "#FCFCFC", align: "center" });
                instructions.anchor.setTo(0.5);

                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(startGame);
            };

            function startGame() {
                themeMusic.stop();
                stopBackground();
                game.state.start('Begin');
            }
        };
    }
);
