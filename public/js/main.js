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
        'gamedata',
        'states/emergencyIT',
        'states/ceoResolution',
        'states/cloud'
    ],
    function(game, Menu, Sprint, GameData, EmergencyIT, CeoResolution, Cloud) {
        'use strict';

        var data = new GameData();
        game.state.add('menu', new Menu(game, data));
        game.state.add('sprint', new Sprint(game, data));
        game.state.add('emergencyIT', new EmergencyIT(game));
        game.state.add('ceoResolution', new CeoResolution(game, data));
        game.state.add('cloud', new Cloud(game));

        game.state.start('menu');
    }
);
