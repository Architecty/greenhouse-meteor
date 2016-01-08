Template.lineChart.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('history', FlowRouter.getParam('sensor_id'), moment().subtract(1, 'days').valueOf(), moment().valueOf());
  });
});

Template.lineChart.rendered = function(){

  Readings.find({}, {time:-1}).observe({

    added: function(){makeBarChart("#targetSVG", Readings.find({}, {time:-1}));

                     }
  });
}


var makeBarChart = function(target, dataCursor){

  var margin = {top: 20, right: 20, bottom: 30, left:50},
      width = 950 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var formatTime = d3.time.format("%H");

  var x = d3.time.scale().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);

  var line = d3.svg.line()
  .x(function(d) { return x(d[1]); })
  .y(function(d) { return y(d[0]); });

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var svg = d3.select(target)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  dataCursor = Readings.find({}, {sort:{time:-1}})

  var data = dataCursor.map(function(doc){
    return [doc.value, doc.time];

  })
  console.log(data);
  svg.append('path')
  .datum(data)
  .attr('class', 'line')
  .attr('d', line);
}
