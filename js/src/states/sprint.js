define(
    [
        'Phaser',
        'text!../../../assets/SeedData.json',
        'icons'
    ],
    function(Phaser, seed, icons)
    {
        'use strict';

        seed = JSON.parse(seed);

        function getCollectibleData() {
            var index = Math.floor(Math.random() * seed.buzzwords.length);
            return seed.buzzwords[index];
        }

        return function Sprint(game, gamedata) {
            var self = this,
                cGroup,
                collectibles = [],
                player,
                rightDown,
                leftDown,
                progress,
                progressCon,
                operationalCost = 0.05,
                killList = [],
                killText = [],
                sprintMusic,
                collectSound;

            function backToMenu(game) {
                game.state.start('menu');
            }

            function addCollectible(game) {

                var collectible = cGroup.create(0, -100, 'collectible' + icons.getRandomIndex(), 0);
                collectible.item = getCollectibleData();

                collectible.width *= 3;
                collectible.height *= 3;

                collectible.x = (game.width - collectible.width) * Math.random();
                collectible.y = -collectible.height;
                collectible.velocity = {x: Math.random() * 10 - 5, y: game.height / 50, r: .2 * Math.random() - .1};
                collectibles.push(collectible);

            }

            function updateCollectible(collectible, game) {
                if (collectible.x < collectible.width / 2) {
                    collectible.x = collectible.width / 2;
                    if (collectible.velocity.x < 0) {
                        collectible.velocity.x = -collectible.velocity.x;
                    }
                }

                if (collectible.x > game.width) {
                    collectible.x = game.width;
                    if(collectible.velocity.x > 0) {
                        collectible.velocity.x = -collectible.velocity.x;
                    }
                }

                collectible.anchor.setTo(0.5, 0.5);

                collectible.x += collectible.velocity.x;
                collectible.y += collectible.velocity.y;

                collectible.rotation += collectible.velocity.r;

                if (collectible.y > game.height + collectible.height) {
                    collectible.kill();
                    removeFromArray(collectibles, collectible);
                }
            }

            function removeFromArray(array, member) {
                for (var i in array) {
                    if (array[i] === member) {
                        delete array[i];
                    }
                }
            }

            function updateKillList() {
                for (var index in killText) {
                    if (typeof text != "undefined") {
                        killText[index].y = killText[index].y + 10;
                    }
                }
                var y = game.height - 80;
                for (var k in killList) {

                    if (killList[k] <= 0) {
                        var color = {fill: "#ff0000"};
                    } else {
                        var color = {fill: "#00ff00"};
                    }

                     var item = game.add.text(k + ' ' + killList[k], color);
                     console.log(k);
                     item.x = game.width - 100;
                     item.y = y;
                     y = y - 10;
                     killText.push(item);
                }
            }

            var maxPlayerVelocity = 21;

            function updatePlayer(game) {
                if (leftDown) {
                    player.velocity.x -= 9;
                } else if (player.velocity.x < 0) {
                    player.velocity.x += 3;
                }

                if (rightDown) {
                    player.velocity.x += 9;
                } else if (player.velocity.x > 0) {
                    player.velocity.x -= 3;
                }

                player.velocity.x = clamp(-maxPlayerVelocity, player.velocity.x, maxPlayerVelocity);

                player.x += player.velocity.x;

                player.x = clamp(0, player.x, game.width - player.width);
            }

            /**
             * Restricts val to the range min-max.
             *
             * @param number min The inclusive low-limit.
             * @param number val The value to restrict.
             * @param number max The inclusive high-limit.
             * @return number The clamped value.
             */
            function clamp(min, val, max) {
                if (min > val) {
                    return min;
                }
                if (max < val) {
                    return max;
                }
                return val;
            }

            var timer = 0;
            var interval = 200;
            var current = interval;

            self.update = function(game) {
                timer += game._deltaTime;
                if (timer > current) {
                    addCollectible(game);
                    current = Math.random() * interval;
                    timer = 0;
                }

                for (var i in collectibles) {
                    updateCollectible(collectibles[i], game);
                }

                game.physics.arcade.collide(player, cGroup, null, collect);

                updatePlayer(game);

                gamedata.funding(-operationalCost);

                progress.height = progressCon.height * gamedata.progress();
                progress.y = 10 + progressCon.height - progress.height;

               // updateKillList();
            };

            self.render = function()
            {

            };

            self.create = function(game)
            {
                gamedata.initFunding();
                gamedata.gameTimer(win, 30);

                sprintMusic = game.add.audio('sprintMusic', 0.4, true);
                sprintMusic.play();

                collectSound = game.add.audio('collectSound', 0.5);

                game.stage.backgroundColor = "#ff8888";

                var esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                esc.onDown.add(backToMenu);

                if (typeof cGroup === 'undefined') {
                    cGroup = game.add.group();
                    cGroup.enableBody = true;
                    cGroup.physicsBodyType = Phaser.Physics.ARCADE;
                }

                player = game.add.sprite(game.width / 2, game.height, 'sprite_player');
                player.width *= 3;
                player.height *= 3;
                player.y -= player.height + 10;
                player.x -= player.width / 2;
                player.enableBody = true;

                player.velocity = {x: 0, y: 0};

                var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

                right.onDown.add(function() {rightDown = true; });
                right.onUp.add(function() {rightDown = false; });

                left.onDown.add(function() {leftDown = true; });
                left.onUp.add(function() {leftDown = false; });

                game.physics.arcade.enable(player);
                player.enableBody = true;

                progressCon = game.add.sprite(10, 10, 'progress_border');
                progressCon.height = game.height - 20;
                progressCon.width = 20;

                progress = game.add.sprite(10, 10, 'progress_bar');
                progress.width = 20;
            };

            function collect(player, collectable) {

//                if (killList.length >= 10) {
//                    killList.shift();
//                    killText[0].kill();
 //                   killText.pop();
  //              }


//                killList[collectable.item.name] = collectable.item.value;
                gamedata.funding(collectable.item.value);

                collectSound.play();

                collectable.kill();


                if (gamedata.won()) {
                    win();
                } else if (gamedata.lost()) {
                    lose();
                }
            }

            function win() {
                sprintMusic.stop();
                refreshState();
                var bankDelta = gamedata.funding() - gamedata.startingFunding();
                gamedata.bankDelta(bankDelta);
                gamedata.tragetFundingIncrement();
                game.state.start('CeoInit');
            }

            function lose() {
                sprintMusic.stop();
                refreshState();
                game.state.start('LoseState');
            }

            function refreshState() {
                sprintMusic.stop();
                game.state.remove("Sprint");
                var nextSprint = new Sprint(game, gamedata);
                game.state.add("Sprint", nextSprint);
            }

        };
    }
);
