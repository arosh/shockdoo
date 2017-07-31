#!/bin/bash
convert -density 400 -flatten scripts/caret.pdf png:- | convert -crop 1200x1200+1054+50 png:- -define icon:auto-resize public/favicon.ico
