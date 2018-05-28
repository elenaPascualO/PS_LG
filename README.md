# This is a coding test as part of a selection process for a job

## It involves two exercises

### Exercise 1. Python
Given a list of numbers, return which of them are Perfect, Abundant and Deficient.

Solution:
1. Created a random list of numbers called *numbers* with function *xrange*
2. Created a function  *which* that given a number, it returns 'P' if perfect, 'A' if abundant and 'D' if deficient.
3. Performed a *map* function on *numbers* passing *which* as a lambda function. It prints in console a list of pairs ('X', n) being 'X', 'P', 'A' or 'D'


### Exercise 2. Javascript and highcharts
Given three series of data from three different url, create a line chart and a pie chart with the three series combined. The format of each series is different and they need to be adapted beforehand.

Solution:
The workflow is based on asynchronous requests and events. One request per series.
If the request succeeds, it will trigger an event that will plot the charts. This is done three times, one per request.
