require.config({
    baseUrl: 'js/src',
    paths: {
        'Phaser': '../vendors/phaser.min',
        'p2': '../vendors/phaser.min',
        'PIKI': '../vendors/phaser.min',
        'text': '../vendors/text'
    }
});

require(
    [
        'game',
        'states/menu',
        'states/sprint',
        'gamedata'
    ],
    function(game, Menu, Sprint, GameData) {
        'use strict';

        var data = new GameData();
        game.state.add('menu', new Menu(game, data));
        game.state.add('sprint', new Sprint(game, data));
        game.state.start('menu');
    }
);
