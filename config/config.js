﻿module.exports = {
    ports: 80,
    session: {
        secret: 'thisIsSecret',
        key: 'thisIsKey',
        maxAge : 30*24*60*1000
    },
    mongodb: 'mongodb://127.0.0.1:27017/'
}