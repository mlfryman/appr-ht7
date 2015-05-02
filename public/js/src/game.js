define(
    ['Phaser'],
    function(Phaser) {
        'use strict';

        function Game()
        {
            var self = this;

            function preload()
            {

            }

            function create()
            {

            }

            function update()
            {

            }

            self.run = function(){

                var game = new Phaser.Game(
                    '100%',
                    '100%',
                    Phaser.AUTO,
                    '',
                    {
                        preload: preload,
                        create: create,
                        update: update
                    }
                );
                return game;
            };
        }

        return new Game();

    }
);
