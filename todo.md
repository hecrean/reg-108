Header:
[]

SVG: 
- 

Canvas:
[] svg timeline animation/transition
[] three.js: reimplement transitions / crossfade
[] orchestrate webgl transitions with css page transitions (look at making some custom transition functions)
[] three.js css2d buttons / labels

Information Panel
[] case study comparison ui
[] bar chart styling: tooltip etc.
[] additional graph views: i.e. radar graph
[] track the change in the metric across the timepoints, leaving a marker of where the baseline for each is on the following timepoints
[] graph scales / units -- snellen score
[] graph comparisons

Cards
[x] For the graphs, each of the case studies needs a distinct colour. Do we also use this to style the cards for each case study?

ISI
[x] Design / function ?
[] click and **scrolls** down to new container? Or simply a fullscreen panel which comes from the bottom?

Case study 1:
[x] text/metrics
[] images  
[] hotspots labels



---

Snellen Fraction:

d: perpendular distance from eye to letter
θ: angle subtended between bottom and top of letter from the eye
h: letter height

We create a triangle with vertices at the eye, midpoint and top of the letter. Right angle triangle, so we can
do some trig:

tan(θ/2) ≃ (h/2) / d

h ≃ 2d tan(θ/2), where d is genrally a standard distance (6m)

Visual acuity = snellen fraction = Distance at which test is made / distance at which the smallest optotype identified subtends an angle of five arcminutes.

so... 20 / 20 is effectively the baseline. When standing at 20ft (6m), the 20/20 letters will subtend an angle of 5 arcminutes. You may well be able to see smaller letters.
You would be having to stand 15ft (rather than 20ft) from the chart in order to get the same θ as with 20/20 situation.

i.e. if snellenFr = D / d, where D = 20ft

h = 2d tan()
