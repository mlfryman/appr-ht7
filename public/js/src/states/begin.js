define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function Begin(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [],
                count = 0;

            var appNames = [
                "InputSupreme",
                "MegaWare",
                "SmartFusion",
                "RisottoLogic",
                "NodeCode",
                "DeprecatedCommand",
                "SafeQuery",
                "DeviceIcing",
                "WikiSmoked",
                "BakeSound",
                "EmulationPod",
                "KernelPeanut",
                "SystemCafe",
                "FrameWare",
                "DefaultOutput",
                "CharacterBinary",
                "OverArray",
                "SkilletColumn",
                "BlogChocolate",
                "FoldCoder",
                "ExceptionPressure",
                "PowerFruit",
                "DishProtocol",
                "TaskTemplate",
                "SoupSample",
                "MegaTag",
                "ChecksumFold",
                "AlgorithmSound",
                "GroupBoolean",
                "DynamicBase",
                "CommandMull",
                "InputDessert",
                "TeaArchitect",
                "PhoneFont",
                "PhoneGreens",
                "RepositoryDeprecated",
                "CyberSalsa",
                "ThreadArray",
                "CharacterCookie",
                "BurnerFile"
            ];


            function backToMenu(game)
            {
                game.state.start('menu');
            }

            self.update = function(game)
            {

            };

            self.render = function()
            {

            };

            self.create = function(game)
            {
                var name = selectName();

                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var text =  "Welcome to " + gamedata.name + "! We do things a little differenly around here, but you\'ll get the hang of it.";

                var welcome = game.add.text(game.world.centerX,
                                            game.world.centerY + 100,
                                            text,
                                            { font: "10px press_start_kregular", fill: "#FCFCFC", align: "center" });
                welcome.anchor.setTo(0.5);

                var go = game.add.text(game.world.centerX, game.world.centerY + 400,'Press SPACE to CONTINUE', { font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
                go.anchor.setTo(0.5);
            };

            function begin()
            {
                game.state.start("Sprint");
            }

            function selectName()
            {
                var appName = appNames[Math.floor(Math.random() * appNames.length)];
                gamedata.appName(appName + ".io");
            }
        };
    }
);
