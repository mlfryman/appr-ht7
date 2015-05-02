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
        'states/sprint'
    ],
    function(game, Menu, Sprint) {
        'use strict';
        game.state.add('menu', new Menu(game));
        game.state.add('sprint', new Sprint(game));
        game.state.start('menu');
    }
);
