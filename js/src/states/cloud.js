define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function Cloud(game, gamedata) {
            var self  = this,
                nimbus,
                app,
                meter = 0,
                txtMeter;

            self.create = function(game) {
                gamedata.gameTimer(lose);
                //- define physics engine
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.physics.arcade.checkCollision.left = true;
                game.physics.arcade.checkCollision.right = true;

                //- draw background
                game.stage.backgroundColor = 0xbb88cc;

                //- define app properties and enable physics
                app = game.add.sprite(game.world.centerX, game.world.centerY, 'app');
                game.physics.arcade.enable(app);
                app.body.setSize(app.width, app.height, 0, 0);
                app.width *= 3;
                app.height *= 3;
                app.body.collideWorldBounds = true;
                app.body.immovable = true;
                app.anchor.set(0.5, 0.5);


                //- enable escape key
                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                //- define cloud properties and enable physics
                nimbus = game.add.sprite(game.world.centerX - 750, game.world.centerY - 150, 'nimbus');
                game.physics.arcade.enable(nimbus);
                nimbus.body.setSize(nimbus.width, nimbus.height, 0, 0);
                nimbus.width *= 3;
                nimbus.height *= 3;
                nimbus.body.collideWorldBounds = true;

                nimbus.inputEnabled = true;
                nimbus.input.enableDrag();
                nimbus.events.onDragStart.add(onDragStart, this);
                nimbus.events.onDragStop.add(onDragStop, this);

                //- text instructions
                game.add.text(0, 20, 'The CEO wants to add automation. Quick! Rub some cloud on your app!', { font: "20px press_start_kregular", fill: "#FCFCFC", align: "center" });

                meter = 0;
                txtMeter = game.add.text(0, 50, 'Meter: 0', { font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
                txtMeter.fixedToCamera = true;
            };

            self.update = function(game) {
                game.physics.arcade.overlap(nimbus, app, rubCloud);
                if (meter > 100) {
                    win();
                }
            };

            self.render = function(game) {
                //game.debug.bodyInfo(nimbus, 32, 32);
                //game.debug.body(nimbus);
                //game.debug.body(app);
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
                refreshState();
                game.state.start('CeoResolution');
            }

            function lose()
            {
                refreshState();
                game.state.start('LoseState');
            }

            self.initVals = function () {
                return "Hey have you heard about the cloud? I think we should use that for something. \n"
                + "People like looking at clouds. Just rub as much cloud \n"
                + "on the app as you can. This is a cricital client ask and\n"
                + "what I beleive to be a best practice \n"
                + "Get on this right away!";
            }

            function refreshState()
            {
                game.state.remove("Cloud");
                var nextSprint = new Cloud(game, gamedata);
                game.state.add("Cloud", nextSprint);
            }
        };
    }
);
