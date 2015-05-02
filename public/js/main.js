require.config({
    baseUrl: 'js/src',
    paths: {
        'Phaser': '../vendors/phaser.min',
        'p2': '../vendors/phaser.min',
        'PIKI': '../vendors/phaser.min'
    }
});

require(
    [
        'game',
        'states/menu',
        'states/sprint',
        'states/ceoResolution'
    ],
    function(game, Menu, Sprint, ceoResolution) {
        'use strict';
        game.state.add('menu', new Menu(game));
        game.state.add('sprint', new Sprint(game));
        game.state.add('ceoResolution', new ceoResolution(game, gamedata));
        game.state.start('menu');
    }
);
