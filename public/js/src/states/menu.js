define(
    [
        'Phaser'
    ],
    function(Phaser) {
        'use strict';

        return function Menu(game, gamedata) {

            var self = this,
                themeMusic,
                sprintMusic,
                miniMusic,
                collectSound;

            self.preload = function() {
                game.load.image('bg_menu',   '/assets/img/starwars_bg.png');

                //- Sprint Assets
                game.load.image('bg_sprint', '/assets/img/starfield_bg.png');
                game.load.image('sprite_player', '/assets/img/cactuar.png');
                game.load.image('collectible', '/assets/img/fire.png');

                //- Emergency IT Minigame Assets
                game.load.image('keyboard', '/assets/img/keyboard.png');
                game.load.image('monitor', '/assets/img/zm-m240w-front-large.jpg');
                game.load.image('pc', '/assets/img/lenovo-desktop-thinkcentre-m93m93p-tower-main.png');
                game.load.image('powerbttn', '/assets/img/POwer-Button.jpg');

                //- CEO Assets
                game.load.image('ceo', '/assets/img/ceo.jpg');

                //- Cloud Minigame Assets
                game.load.image('nimbus', '/assets/img/cloud.png');
                game.load.image('app', '/assets/img/app.png');

                //- Audio files
                game.load.audio('themeMusic', '/assets/audio/main_theme.mp3');
                game.load.audio('sprintMusic', '/assets/audio/ark_theme.mp3');
                game.load.audio('miniMusic', '/assets/audio/rock_theme.mp3');
                game.load.audio('collectSound', '/assets/audio/key.wav');

            };

            self.update = function() {

            };

            self.create = function() {

                themeMusic = game.add.audio('themeMusic', 1, true);
                themeMusic.play();

                var background = game.add.sprite(0, 0, 'bg_menu');
                background.width = game.width;
                background.height = game.height;

                var title = game.add.text(game.world.centerX, game.world.centerY -100, 'appr', { font: "75px press_start_kregular", fill: "#FCFCFC", align: "center" });
                title.anchor.setTo(0.5);

                var instructions = game.add.text(game.world.centerX, game.world.centerY + 100, 'Press SPACE to play', { font: "25px press_start_kregular", fill: "#FCFCFC", align: "center" });
                instructions.anchor.setTo(0.5);

                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(startGame);
            };

            function startGame() {
                themeMusic.stop();
                game.state.start('Begin');
            }
        };
    }
);
