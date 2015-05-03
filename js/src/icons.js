define(
    ['text!assets/Icons.json'],
    function(icons) {
        'use strict';
        icons = JSON.parse(icons);

        return new (function(){

            var self = this;

            self.getRandomIndex = function() {
                return Math.floor(Math.random() * icons.length);
            };

            self.getRandom = function() {
                var index = self.getRandomIndex();
                return icons[index];
            };

            self.each = function(cb) {
                if (typeof cb !== 'function') {
                    return;
                }

                for (var i in icons) {
                    cb(icons[i], i);
                }
            };

        })();
    }
);
