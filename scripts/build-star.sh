#!/bin/bash
set -ue

convert -crop 80x89+0+0   scripts/orig/star5.png src/assets/stars/star1y.png
convert -crop 80x89+78+0  scripts/orig/star5.png src/assets/stars/star2y.png
convert -crop 80x89+156+0 scripts/orig/star5.png src/assets/stars/star3y.png
convert -crop 80x89+234+0 scripts/orig/star5.png src/assets/stars/star4y.png
convert -crop 80x89+312+0 scripts/orig/star5.png src/assets/stars/star5y.png

convert -crop 80x89+0+0   scripts/orig/star0.png src/assets/stars/star1n.png
convert -crop 80x89+78+0  scripts/orig/star0.png src/assets/stars/star2n.png
convert -crop 80x89+156+0 scripts/orig/star0.png src/assets/stars/star3n.png
convert -crop 80x89+234+0 scripts/orig/star0.png src/assets/stars/star4n.png
convert -crop 80x89+312+0 scripts/orig/star0.png src/assets/stars/star5n.png
