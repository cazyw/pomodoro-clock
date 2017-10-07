# Pomodoro Clock App

Free Code Camp Advanced Project - Pomodoro Clock App

## Objective

Build an app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/aNyxXR

* I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
* I can reset the clock for my next pomodoro.
* I can customize the length of each pomodoro.

## Operating Instructions

<!-- <img src="" width="450" alt=""> -->


## Discussion

Remember to include the following if using eslint
```
./node_modules/.bin/eslint --init
```
### Design

The example given used a circle that slowly filled as time passed. I've seen a few pretty cool designs with outline shapes getting slowly filled in (as if being drawn) and wanted to do something similar.

Initially I tried using a button. I was able to get the border of the button to change colours over time (using `transition: color`) however I was unable to get the border to draw itself/fill in. What seemed to be used by others was `svg` or scalable vector graphics.

I've never used these before so it took a bit of research but I finally settled on using a `rect` as a base, and `path` to fill in the "border of the rectangle".