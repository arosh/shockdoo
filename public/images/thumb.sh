#!/bin/bash
DIR=samples
OUT=thumb
ls ${DIR}/*.jpg | xargs -I{} basename {} | xargs -I{} convert ${DIR}/{} -thumbnail '768x768^' -gravity center -extent 768x768 ${OUT}/{}
