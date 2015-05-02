require.config({
    baseUrl: 'js/src',
    paths: {
        'Phaser': '../vendors/phaser',
    }
});

require(
    [
        'game'
    ],
    function(game) {
        'use strict';
        game.run();
    }
);
