define(
    [
        'Phaser'
    ],
    function(Phaser) {
        'use strict';

        return function Menu(game) {

            var self = this;

            self.preload = function() {
                game.load.image('bg_menu',   '/assets/img/starwars_bg.png');
                game.load.image('bg_sprint', '/assets/img/starfield_bg.png');

                game.load.image('sprite_player', '/assets/img/cactuar.png');
                game.load.image('collectible',   '/assets/img/fire.png');
                game.load.image('nimbus',        '/assets/img/cloud.png');

            };

            function startGame() {
                game.state.start('cloud');
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
