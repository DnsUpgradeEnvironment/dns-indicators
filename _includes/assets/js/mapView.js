var mapView = function () {

  "use strict";

  this.initialise = function(goal, indicatorId, precision, precisionItems, decimalSeparator, dataSchema, viewHelpers, modelHelpers, chartTitles) {
    $('.map').show();
    $('#map').sdgMap({
      goal: goal,
      indicatorId: indicatorId,
      mapOptions: {{ site.map_options | jsonify }},
      mapLayers: {{ site.map_layers | jsonify }},
      precision: precision,
      precisionItems: precisionItems,
      decimalSeparator: decimalSeparator,
      dataSchema: dataSchema,
      viewHelpers: viewHelpers,
      modelHelpers: modelHelpers,
      chartTitles: chartTitles,
    });
  };
};
