Template.lineChart.onCreated(function(){
    Session.set('startMoment', moment().subtract(1, 'days').valueOf())
    Session.set('endMoment', moment().valueOf())
  var self = this;
  self.autorun(function () {
    var startMoment = Session.get('startMoment');
    var endMoment = Session.get('endMoment');

    self.subscribe('history', FlowRouter.getParam('sensor_id'), startMoment, endMoment);
    makeBarChart();
  });
});

Template.lineChart.onRendered(function() {
  $('#startTime').datetimepicker({
    format: 'MM/DD/YYYY',
    defaultDate: moment().subtract(1, 'days')
  })
  .on('dp.change', function(e){
    Session.set('startMoment', e.date.valueOf())
  });

  $('#endTime').datetimepicker({
    format: 'MM/DD/YYYY',
    defaultDate: moment()
  })
  .on('dp.change', function(e){
    Session.set('endMoment', e.date.valueOf())
  });
});

Template.lineChart.helpers({
  makeBarChart: function(){
    makeBarChart();
  }
})


var makeBarChart = function(target){
  d3.select("#target").selectAll("svg").remove();
  var margin = {top: 20, right: 20, bottom: 30, left:50},
      width = 650 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseTime = d3.time.format("%L").parse;

  var x = d3.time.scale().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);



  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(12);

  var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

  // Define the line
  var valueline = d3.svg.line()
  .x(function(d) { return x(d.time); })
  .y(function(d) { return y(d.value); });

  // Adds the svg canvas
  var svg = d3.select("#target")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  var allHistory = HourlyAverage.find({},{sort:{time:1}});

  console.log(allHistory.count());
  var data = allHistory.map(function(doc){
    return {
      time: doc.time,
      value: CentigradeToFarenheit(doc.value)
    };
  })

  x.domain(d3.extent(data, function(d) { return d.time; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  console.log(data);
  svg.append('path')
  .attr('class', 'line')
  .attr('d', valueline(data));


  // Add the X Axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  // Add the Y Axis
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

}
