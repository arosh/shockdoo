#!/bin/bash
convert -density 200 -flatten favicon/caret.pdf png:- | convert -crop 600x600+527+25 png:- -define icon:auto-resize public/favicon.ico
