require.config({
    baseUrl: 'js/src',
    paths: {
        'Phaser': '../vendors/phaser',
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
