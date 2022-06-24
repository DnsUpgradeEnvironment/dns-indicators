/**
 * @param {null|undefined|Float|String} value
 * @param {Object} info
 * @param {Object} context
 * @return {null|undefined|Float|String}
 */
function alterDataDisplay(value, info, context) {
    // If value is empty, we will not alter it.
    if (value == null || value == undefined) {
        return value;
    }
    // Before passing to user-defined dataDisplayAlterations, let's
    // do our best to ensure that it starts out as a number.
    var altered = value;
    if (typeof altered !== 'number') {
        altered = Number(value);
    }
    // If that gave us a non-number, return original.
    if (isNaN(altered)) {
        return value;
    }
    // Now go ahead with user-defined alterations.
    opensdg.dataDisplayAlterations.forEach(function (callback) {
        altered = callback(altered, info, context);
    });
    // Now apply our custom precision control if needed.
    if (VIEW._precision || VIEW._precision === 0) {
        altered = Number.parseFloat(altered).toFixed(VIEW._precision);
    }
    // Now apply our custom decimal separator if needed.
    if (OPTIONS.decimalSeparator) {
      if (value > 999 || value < -999) {
        altered = altered.toString().replace('.', 'deicmalSeperatorPlaceholder');
        altered = altered.replace(',','.');
        altered = altered.replace('deicmalSeperatorPlaceholder', OPTIONS.decimalSeparator);
      }
      else {
        altered = altered.toString().replace('.', OPTIONS.decimalSeparator);
      }
    }
    // if there is a ',' - thousands seperator, replace it by a '.'
    if (!OPTIONS.decimalSeparator && (value > 999 || value < -999)) {
        altered = altered.toString().replace(',', '.');
    }
    return altered;
}
