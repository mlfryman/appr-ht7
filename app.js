var http   = require('http'),
    fs     = require('fs'),
    path   = require('path'),
    mime   = require('mime-types'),
    server = http.createServer(
        function(req, res) {
            'use strict';
            var rootDir = 'public';
            var filepath = path.join.apply(path, ['.', rootDir].concat(req.url.split('/')));

            if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                res.setHeader('Content-Type', mime.contentType(filepath));
                res.write(fs.readFileSync(filepath));
            } else if (req.url === '/') {
                filepath = path.join('.', rootDir, 'index.html');
                res.setHeader('Content-Type', mime.contentType(filepath));
                res.write(fs.readFileSync(filepath));
            } else {
                res.statusCode = 404;
                res.write('Not found, sucka.');
            }
            res.end();

        }
    ).listen(8080);
