#!/bin/bash
set -ue
BIN=node_modules/.bin/node-sass
MDL_SRC=node_modules/material-design-lite/src
OUT=src/assets/material-design-lite
$BIN $MDL_SRC/typography/_typography.scss -o $OUT
$BIN $MDL_SRC/resets/_resets.scss -o $OUT
