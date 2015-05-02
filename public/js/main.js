require.config({
    baseUrl : 'js',
    paths : {
        'Phaser' : 'vendors/phaser'
    },
    shim : {
        'Phaser' : {
            exports : 'Phaser'
        }
    }
});

require(
    [
        'Phaser'
    ],
    function(Phaser) {
        console.log(Phaser);
    }
);