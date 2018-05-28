/**
* It performs transformations on the first series:
*   - It converts category ('cat') to upper case
*   - It converts 'd' (date) to format yyyy-mm-dd 
*
* @param {string} series Data from source
* @returns {json} Transformed data
*/
function transSeries1(series) {

    var data = JSON.parse(series);

    var data2 = _.forEach(data, function(elem) {
        elem.cat = elem.cat.toUpperCase();
    });

    var data3 = _.forEach(data2, function(elem) {
        var date = new Date(elem.d);
        elem.d = dateFormat(date, "yyyy-mm-dd");
    });
    return data3;
}

/**
* It performs transformations on the second series:
*   - It converts category ('cat') to upper case
*   - It standarizes the object's format to 'cat', 'd' and 'value'
*
* @param {string} series Data from source
* @returns {json} Transformed data
*/
function transSeries2(series) {
    var data = JSON.parse(series);
    var data2 = _.forEach(data, function(elem) {
        elem.categ = _.upperCase(elem.categ);
    });
    var data3 = _.map(data2, function(elem) {
        return { 'cat': elem.categ, 'd': elem.myDate, 'value': elem.val };
    });
    return data3;
}

/**
* It performs transformations on the third series:
*   - It extracts type fo category from raw data
*   - It converts category ('cat') to upper case
*   - It extracts date from raw data
*   - It standarizes the object's format to 'cat', 'd' and 'value'
*
* @param {string} series Data from source
* @returns {json} Transformed data
*/
function transSeries3(series) {
    var data = JSON.parse(series);
    var data2 = _.forEach(data, function(elem) {
        var raw = elem.raw;
        elem.cat = _.trim(raw.match(/#[Cc][Aa][Tt] [1-9]+#/g)[0], "#")
        elem.cat = _.upperCase(elem.cat);
        elem.date = raw.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)[0]
    });

    var data3 = _.map(data2, function(elem) {
        return { 'cat': elem.cat, 'd': elem.date, 'value': elem.val };
    });
    return data3;
}