define(
    [
        'Phaser'
    ],
    function(Phaser)
    {
        'use strict';

        return function KickStarter(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [];
            var count = 0;

            var appNames = new array(
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
            );


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
                var background = game.add.sprite(0, 0, 'bg_sprint');
                background.width = game.width;
                background.height = game.height;

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                var btn = game.add.button(0,0,'continue', begin, this);
            };

            function begin()
            {
                selectName();
                game.state.start("Sprint");
            }

            function selectName()
            {
                var appName = appNames[Math.floor(Math.random()*choices.length)];
                gamedata.appName(appName + ".io");
            }
        };
    }
);