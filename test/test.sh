#!/bin/bash

cd node_modules/backstopjs

gulp bless --backstopConfigFilePath=../../config.js

gulp test --backstopConfigFilePath=../../config.js