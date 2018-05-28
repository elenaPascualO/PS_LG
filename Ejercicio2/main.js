/**
* It stores the data that will be used for the graphs
*/
var chartData = {};

/**
* It handles errors. All errors are redirected to this function
*
* @param {string} error Error message 
*/
function handleError(error) {
    console.error(error.message);
}

/**
* It creates an event emitter
*/
var dataChange = new EventEmitter();

/**
* It sets a function called 'update' to the event emitter. 
*
* @param {string} Error message 
* @param {function} Function thay will be performed every time 'update' is called
*/
dataChange.on("update", function() {
    var result = prepareDataForChart(chartData)
    plotLineChart(result[0], result[1], result[2], result[3], result[4]);
    plotPieChart(result[0], result[1], result[2], result[3]);
})

/**
* Entry point for data transformations
*
* @param {function} transformationFunction Function to perform specific-to-series tansformations
* @param {string} series Raw data from source 
*/
function readData(transformationFunction, series) {

    var data = transformationFunction(series);

    //Common transformations for all series

    //group by category and date
    data = _.groupBy(data, function(elem) { return elem.cat + "," + elem.d });

    //it calculates the sum of all values for each element
    data = _.forEach(data, function(elem) {
        if (elem.lenght > 1) {
            elem.totalValue = _.reduce(elem.value, function(u, v) { return u + v }, 0);
        }
    });

    //it gives back the original format
    data = _.map(data, function(elem) {
        return { 'cat': elem[0].cat, 'value': elem[0].value, 'd': elem[0].d };
    });

    //it sorts by date
    data = _.sortBy(data, function(elem) {
        return elem.d;
    })

    //it groups by date
    data = _.groupBy(data, function(elem) { return elem.d });
    _.extend(chartData, data);

}

/**
* Requests data from source and emits event to update the chart data
*
* @param {string} url Url where the data is
* @param {function} transformationFunction Function that will be send to event emitter
*/
function requestData(url, transformationFunction) {
    var req = new XMLHttpRequest();
    req.timeout = 2000;
    req.onreadystatechange = function(e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                readData(transformationFunction, this.responseText);
                dataChange.emit("update");
            } else {
                handleError(new Error("unexpected status"));
            }
        }
    }
    req.ontimeout = function() {
        handleError(new Error('timeout on url: ' + url));
    };
    req.open("get", url, true)
    req.send();
}

requestData("http://s3.amazonaws.com/logtrust-static/test/test/data1.json", transSeries1);
requestData("http://s3.amazonaws.com/logtrust-static/test/test/data2.json", transSeries2);
requestData("http://s3.amazonaws.com/logtrust-static/test/test/data3.json", transSeries3);