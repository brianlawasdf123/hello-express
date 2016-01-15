var express = require('express');
var app = express();
var domain = require('domain');
var EventEmitter = require('events').EventEmitter;

var server = app.listen(3005);

// server.timeout = 5000;

// server.setTimeout(5000, function (socket) {
//     // console.log('timed out');
// });

var id = 1;

app.use(express.static('public'));

app.get('/stream', function (req, res, next) {

    var clearId = setInterval(function() {
        console.log('writing count ' + id);
        res.write('count: ' + id++);

    }, 1000);

    req.on('close', function () {
        console.log('closing');
        clearInterval(clearId);
        res.end();
    })

    // setTimeout(function () {
    //     // clearInterval(clearId);
    //     res.end();
    // }, 500)

    // res.end();
});

// app.use(function (req, res, next) {
//     var d = domain.create();

//     req.id = id;
//     id += 1;

//     d.add(req);
//     d.add(res);

//     // req.setTimeout(1000)

//     res.end = function () {}

//     d.on('error', function (err) {
//         next(err);
//     });

//     res.on('finish', function () {
//         console.log('RES_FINISHED');
//     });

//     d.run(function () {
//         next();
//     });
// });

// // app.use(function (req, res, next) {
// //     next();
// // });

app.get('/', function (req, res) {
    // res.json({ foo: 'bar' });
});

// app.get('/foo', function (req, res) {
//     res.json({ foo: 'bar' });
// });

// app.get('/timeout', function (req, res) {

//     setTimeout(function () {
//         if (process.domain.timedOut) {
//             console.log('timed out');
//         } else {
//             res.json({ foo: 'bar' });
//         }

//     }, 5000);
// });

// app.get('/test', function (req, res) {
//     setTimeout(function () {
//         res.send('GJ');
//     }, 9000);
// });



app.use(function (err, req, res, next) {

    // console.log('starting work');
    // res.locals.emitter.emit('dowork');
    // console.log('done work');

    res.send(err.stack);

    if (err.domain) {
        console.log('Gracefully shutting down');
    }
});




