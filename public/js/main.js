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
        'states/ceoInit',
        'states/loseState',
        'states/begin',
    ],
    function(game, Menu, Sprint, GameData, EmergencyIT, CeoResolution, Cloud, KickStarter, CeoInit, LoseState, Begin) {
        'use strict';

        var data = new GameData(game);
        game.state.add('Menu', new Menu(game, data));
        game.state.add('Sprint', new Sprint(game, data));
        game.state.add('EmergencyIT', new EmergencyIT(game, data));
        game.state.add('CeoResolution', new CeoResolution(game, data));

        game.state.add('Cloud', new Cloud(game, data));
        game.state.add('KickStarter', new KickStarter(game, data));
        game.state.add('CeoInit', new CeoInit(game, data));
        game.state.add('LoseState', new LoseState(game, data));
        game.state.add('Begin', new Begin(game, data));

        game.state.start('Menu');
    }
);
