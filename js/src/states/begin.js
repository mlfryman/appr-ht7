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

                game.stage.backgroundColor = 0x333333;
                selectName();
                var name = gamedata.appName();

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(begin);

                var title = game.add.text(game.world.centerX,
                                            game.world.centerY - 150,
                                            "Welcome to " + name + "! \n" ,
                                            { font: "40px press_start_kregular", fill: "#FCFCFC", align: "center" });
                title.anchor.setTo(0.5);

                var text = "We've got enough funding for maybe one sprint. \n\n" +
                "The more we can convince investors that we can \n" +
                "attract users with hot new technologies, \n" +
                "the better the odds we'll be funded. \n" +
                "Do you prefer RedBull or RockStar?";


                var welcome = game.add.text(game.world.centerX,
                                            game.world.centerY + 75,
                                            text,
                                            { font: "20px press_start_kregular", fill: "#FCFCFC", align: "center" });
                welcome.anchor.setTo(0.5);

                var go = game.add.text(game.world.centerX, game.height,'Press SPACE to CONTINUE', { font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
                go.anchor.setTo(0.5);

                go.y -= go.height + 20;
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
