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
        'states/sprint',
        'states/cloud'
    ],
    function(game, Menu, Sprint, Cloud) {
        'use strict';
        game.state.add('menu', new Menu(game));
        game.state.add('sprint', new Sprint(game));
        game.state.add('cloud', new Cloud(game));
        game.state.start('menu');
    }
);
