#!/bin/bash

cd /var/www
npm install
bower install
/usr/local/bin/compass compile
npm run buildAll
