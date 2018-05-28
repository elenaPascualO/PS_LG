/**
* Prepare data for chart. It divides the data in categories and dates
*
* @param {json} chartData Data 
* @returns {array[json]} Categories and dates
*/
function prepareDataForChart(chartData) {
    var cat1 = [];
    var cat2 = [];
    var cat3 = [];
    var cat4 = [];
    var dates = [];

    _.forEach(chartData, function(elem) {
        dates.push(elem[0].d);
        var c1 = _.find(elem, function(i) { return i.cat == 'CAT 1' });
        var c2 = _.find(elem, function(i) { return i.cat == 'CAT 2' });
        var c3 = _.find(elem, function(i) { return i.cat == 'CAT 3' });
        var c4 = _.find(elem, function(i) { return i.cat == 'CAT 4' });
        if (c1 === undefined) {
            cat1.push(null);
        } else {
            cat1.push(c1.value);
        }
        if (c2 === undefined) {
            cat2.push(null);
        } else {
            cat2.push(c2.value);
        }
        if (c3 === undefined) {
            cat3.push(null);
        } else {
            cat3.push(c3.value);
        }
        if (c4 === undefined) {
            cat4.push(null);
        } else {
            cat4.push(c4.value);
        }
    });
    return [cat1, cat2, cat3, cat4, dates];
}

/**
* Plot Line chart. 
*
* @param {Array[number]} cat1 Values from category one 
* @param {Array[number]} cat2 Values from category two
* @param {Array[number]} cat3 Values from category three
* @param {Array[number]} cat4 Values from category four
* @param {Array[number]} dates Dates with format yyyy-mm-dd
*/
function plotLineChart(cat1, cat2, cat3, cat4, dates) {
    var lineChart = Highcharts.chart('lineChart', {
        title: {
            text: 'Test'
        },
        subtitle: {
            text: 'This is a test'
        },
        chart: {
            defaultSeriesType: 'spline'
        },
        yAxis: {
            title: {
                text: "Values"
            }
        },
        xAxis: {
            title: {
                text: "Dates"
            },
            categories: dates
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{ name: "CAT 1", data: cat1 },
            { name: "CAT 2", data: cat2 },
            { name: "CAT 3", data: cat3 },
            { name: "CAT 4", data: cat4 }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

}

/**
* Plot Pie chart. 
*
* @param {Array[number]} cat1 Values from category one 
* @param {Array[number]} cat2 Values from category two
* @param {Array[number]} cat3 Values from category three
* @param {Array[number]} cat4 Values from category four
*/
function plotPieChart(cat1, cat2, cat3, cat4) {

    cat1 = _.reduce(cat1, function(n, m) { return n + m }, 0);
    cat2 = _.reduce(cat2, function(n, m) { return n + m }, 0);
    cat3 = _.reduce(cat3, function(n, m) { return n + m }, 0);
    cat4 = _.reduce(cat4, function(n, m) { return n + m }, 0);

    Highcharts.chart('pieChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Test'
        },
        subtitle: {
            text: 'This is a test'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Values',
            colorByPoint: true,
            data: [{ name: "CAT 1", y: cat1 },
                { name: "CAT 2", y: cat2 },
                { name: "CAT 3", y: cat3 },
                { name: "CAT 4", y: cat4 }
            ]
        }]
    });
}