Meteor.startup(function(){

  Meteor.methods({
    addFalseHourlyRecords: function(sensor_id, maxRange, minRange){
      for(var i = 0; i < 30; i++){
        HourlyAverage.insert({
          sensor_id: sensor_id,
          time: moment().startOf('hour').subtract(i, 'hours').valueOf(),
          value: minRange + (((maxRange - minRange) / 30) * i)
        });
      }
    }
  })
});
