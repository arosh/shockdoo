#!/bin/bash
ls foods/*.jpg | xargs -I{} basename {} | xargs -I{} convert foods/{} -thumbnail '768x768^' -gravity center -extent 768x768 thumb/{}

