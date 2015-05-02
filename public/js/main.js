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
        'states/emergencyIT'
    ],
    function(game, Menu, Sprint, emergencyIT) {
        'use strict';
        game.state.add('menu', new Menu(game));
        game.state.add('sprint', new Sprint(game));
        game.state.add('emergencyIT', new emergencyIT(game));
        game.state.start('menu');
    }
);
