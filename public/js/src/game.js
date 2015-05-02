define(
    ['Phaser'],
    function(Phaser) {
        'use strict';

        function Game()
        {
            var self = this;

            self.states = [];

            self.preload = function()
            {

            };

            self.create = function()
            {

            };

            self.update = function()
            {

            };

            self.run = function(){

                var game = new Phaser.Game(
                    '100%',
                    '100%',
                    Phaser.AUTO,
                    '',
                    {
                        preload: self.preload,
                        create: self.create,
                        update: self.update
                    }
                );
                return game;
            };
        }

        return (new Game()).run();

    }
);
