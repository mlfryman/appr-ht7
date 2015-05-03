define(
    [
        'Phaser',
        'icons'
    ],
    function(Phaser, icons) {
        'use strict';

        return function Menu(game, gamedata) {

            var self = this;

            self.preload = function() {
                game.load.image('bg_menu',   '/assets/img/starwars_bg.png');

                //- Sprint Assets
                game.load.image('sprite_player', '/assets/img/app_folder.png');
                icons.each(function(icon, index){
                    game.load.image('collectible' + index, '/assets/img/icons/' + icon + '.png');
                });

                game.load.image('progress_border', '/assets/img/progress_border.png');
                game.load.image('progress_bar', '/assets/img/progress_bar.png');

                //- Emergency IT Minigame Assets
                game.load.image('keyboard', '/assets/img/keyboard.png');
                game.load.spritesheet('monitor', '/assets/img/monitor_spritesheet.png', 53, 51);
                game.load.spritesheet('pc', '/assets/img/tower_spritesheet.png', 27, 51);

                //- CEO Assets
                game.load.image('ceo', '/assets/img/ceo.png');

                //- Cloud Minigame Assets
                game.load.spritesheet('nimbus', '/assets/img/cloud2.png', 58, 36);
                game.load.image('app', '/assets/img/app_folder.png');
            };

            function startGame() {
                game.state.start('EmergencyIT');
            }

            self.update = function() {

            };

            self.create = function() {
                var background = game.add.sprite(0, 0, 'bg_menu');
                background.width = game.width;
                background.height = game.height;

                game.add.text(0, 0, 'Hello World', {fill: '#ffffff'});
                game.add.text(0, 40, 'Press spacebar to continue.', {fill: '#ffffff'});

                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(startGame);
            };
        };
    }
);
