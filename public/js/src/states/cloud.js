define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function Cloud() {
            var self  = this,
                nimbus,
                app,
                meter = 0,
                txtMeter;

            self.create = function(game) {
                //- define physics engine
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.physics.arcade.checkCollision.left = true;
                game.physics.arcade.checkCollision.right = true;

                //- draw background
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                //- define app properties and enable physics
                app = game.add.sprite(game.world.centerX, game.world.centerY, 'app');
                game.physics.arcade.enable(app);
                app.body.setSize(450, 450, 0, 0);
                app.body.collideWorldBounds = true;
                app.body.immovable = true;
                app.anchor.set(0.5, 0.5);

                //- enable escape key
                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                //- define cloud properties and enable physics
                nimbus = game.add.sprite(game.world.centerX - 750, game.world.centerY - 150, 'nimbus');
                game.physics.arcade.enable(nimbus);
                nimbus.body.setSize(300, 188, 0, 0);
                nimbus.body.collideWorldBounds = true;

                nimbus.inputEnabled = true;
                nimbus.input.enableDrag();
                nimbus.events.onDragStart.add(onDragStart, this);
                nimbus.events.onDragStop.add(onDragStop, this);

                //- text instructions
                game.add.text(0, 20, 'The CEO wants to add automation. Quick! Rub some cloud on your app!', {fill: '#ffffff'});

                meter = 0;
                txtMeter = game.add.text(0, 50, 'Meter: 0', {fill: "#FCFCFC"});
                txtMeter.fixedToCamera = true;
            };

            self.update = function(game) {
                game.physics.arcade.overlap(nimbus, app, rubCloud);

            };

            self.render = function(game) {
                //- game.debug.bodyInfo(nimbus, 32, 32);
                //- game.debug.body(nimbus);
                //- game.debug.body(app);
            };

            function rubCloud(nimbus, app) {
                txtMeter.text = 'Meter: ' + meter + '%';
                meter += Math.floor(Phaser.Math.distance(nimbus.previousPosition.x, nimbus.previousPosition.y, nimbus.position.x, nimbus.position.y)/100);
                console.log('Nimbus.previousPosition.x: ' + nimbus.previousPosition.x,
                            'Nimbus.previousPosition.y: ' + nimbus.previousPosition.y,
                            'Nimbus.position.x: ' + nimbus.position.x,
                            'Nimus.position.y: ' + nimbus.position.y);
            }

            function onDragStart() {
                nimbus.body.moves = false;
            }

            function onDragStop() {
                nimbus.body.moves = true;
            }

            function backToMenu(game) {
                game.state.start('menu');
            }

            function win()
            {
                game.state.start("CeoResolution");
            }
        };
    }
);
