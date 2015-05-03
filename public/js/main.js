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
        'states/cloud',
        'states/kickstarter',
        'ceoInit',
    ],
    function(game, Menu, Sprint, GameData, EmergencyIT, CeoResolution, Cloud, KickStarter, CeoInit) {
        'use strict';

        var data = new GameData();
        game.state.add('Menu', new Menu(game, data));
        game.state.add('Sprint', new Sprint(game, data));
        game.state.add('EmergencyIT', new EmergencyIT(game, data));
        game.state.add('CeoResolution', new CeoResolution(game, data));
        game.state.add('Cloud', new Cloud(game));
        game.state.add('KickStarter', new KickStarter(game));
        game.state.start('CeoInit', new ceoInit(game));
    }
);
