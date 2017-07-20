#!/bin/bash
set -ue

convert -crop 80x89+0+0   orig/star5.png star1y.png
convert -crop 80x89+80+0  orig/star5.png star2y.png
convert -crop 80x89+160+0 orig/star5.png star3y.png
convert -crop 80x89+240+0 orig/star5.png star4y.png
convert -crop 80x89+320+0 orig/star5.png star5y.png

convert -crop 80x89+0+0   orig/star0.png star1n.png
convert -crop 80x89+80+0  orig/star0.png star2n.png
convert -crop 80x89+160+0 orig/star0.png star3n.png
convert -crop 80x89+240+0 orig/star0.png star4n.png
convert -crop 80x89+320+0 orig/star0.png star5n.png
