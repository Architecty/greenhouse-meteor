Meteor.startup(function(){

  Meteor.methods({
    addValues: function(valuesArray){ //A method to add values from the Raspberry Pi to the system;
      var currentDate = new Date();
      for(var i = 0; i < valuesArray.length; i++){
        var thisSensor_id = findSensor(valuesArray[i].sensorID, valuesArray[i].currentIP);
        var value = +valuesArray[i].value.match(/-??\d+/)[0];
        switch(valuesArray[i].sensorType){
          case "temp":
            value = value / 1000;
            break;
          default:
            value = value / 1000;
            break;
        }

        Readings.insert({
          sensor_id: thisSensor_id,
          value: value,
          time: currentDate.getTime()
        });
        sumHourly(thisSensor_id);
        testAlarms(thisSensor_id);
        clearAlarms(thisSensor_id);
        console.log("Added Reading", value, "from sensor", valuesArray[i].sensorID);
      }
      clearLoginToken();
    },
    updateSensor: function(sensor_id, name, desc, type){
      if(!Meteor.user()) return;
      Sensors.update({_id: sensor_id}, {$set: {name: name, type: type, desc: desc}});
      return;
    },
    updateAccount: function(firstName, lastName, telephone, IFTTT){
      if(!Meteor.user()) return;
      Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.firstName": firstName, "profile.lastName": lastName, "profile.telephone": telephone, "keys.IFTTT": IFTTT}});
      console.log("Updated user");
    },
    addAlarm: function(sensor_id, name, alarmType, value, msgTypes){
      if(!Meteor.user()) return;
      console.log("Add Alarm");
      var sendEmail = (msgTypes.indexOf("email") > -1),
          sendSMS = (msgTypes.indexOf("sms") > -1);

      Alarms.insert({sensor_id: sensor_id, owner_id: Meteor.userId(), name: name, alarmType: alarmType, value: value, enabled:true, active:false, actions:{sendEmail: sendEmail, sendSMS:sendSMS}});
      return;
    },
    editAlarm: function(alarm_id, name, alarmType, value, msgTypes){
      if(!Meteor.user()) return;
      var sendEmail = (msgTypes.indexOf("email") > -1),
          sendSMS = (msgTypes.indexOf("sms") > -1),
          sendIFTTT = (msgTypes.indexOf("IFTTT") > -1);
      Alarms.update({_id: alarm_id}, {$set: {name: name, alarmType: alarmType, value: value, enabled:true, active:false, actions:{sendIFTTT: sendIFTTT, sendEmail: sendEmail, sendSMS:sendSMS}}});
      return;
    },
    disableAlarm: function(alarm_id){
      if(!Meteor.user()) return;
      Alarms.update({_id: alarm_id}, {$set: {enabled: false}});
      return;
    },
    updatePastHourly: function(alarm_id){
      if(!Meteor.user()) return;
      updatePastHourly();
    },
    addController: function(name, desc, ID, secret){
      return addController(name, desc, ID, secret);
    },
    updateController: function(controller_id, name, desc, secret){
      return updateController(controller_id, name, desc, secret);
    }
  })
})


var updateController = function(controller_id, name, desc, secret){
  Meteor.users.update({
    _id: controller_id,
    type: "controller",
    owner_id: Meteor.userId()
  }, {
    $set: {
      name: name,
      desc: desc,
    }
  })

  //Make sure that the new secret is sufficiently long, and that the 'controller' being selected is actually a controller owned by this person, and not something bad.
  if(secret && secret.length >= 10){
    if(Meteor.users.findOne({_id: controller_id, type: "controller", owner_id: Meteor.userId()})){
      Accounts.setPassword(controller_id, secret);
    }
  }
  console.log("Edited Controller");
  return true;
}


var addController = function(name, desc, ID, secret){
  var newController = Accounts.createUser({
    username: ID,
    password: secret
  });
  Meteor.users.update({
    _id: newController
  }, {
    $set: {
      type: "controller",
      name: name,
      desc: desc,
      owner_id: Meteor.userId()
    }
  })
  console.log("Added new Controller");
  return true;
}

var updatePastHourly = function(){
  var allSensors = Sensors.find();

  allSensors.forEach(function(doc){
    updateSensorsHourly(doc._id);
  })
  console.log("Finished updated past sensors");
}

var updateSensorsHourly = function(sensor_id){
  var earliestMoment = Readings.findOne({sensor_id: sensor_id}, {sort: {time:1}});
  var currentHour = moment().startOf('hour');
  while(currentHour.valueOf() > earliestMoment.time){
    var allReadings = Readings.find({
      sensor_id: sensor_id,
      time: {
        $gte: currentHour.valueOf(),
        $lt: currentHour.valueOf() + (60 * 60 * 1000)
      }
    });
    var average = null;
    var readingsCount = allReadings.count();
    if(readingsCount){
      var readingsSum = 0;
      allReadings.forEach(function(doc){
        readingsSum += doc.value;
      })
      average = readingsSum / readingsCount;
    }
    HourlyAverage.upsert({sensor_id: sensor_id, time: currentHour.valueOf()}, {$set: {value: average}});
    currentHour.subtract(1, 'hours');
  }
  console.log("Finished updating sensors");
}


var sumHourly = function(sensor_id){
  var lastHourMs = moment().startOf('hour').valueOf();
  var allReadings = Readings.find({sensor_id: sensor_id, time: {$gte: lastHourMs}});
  var readingsCount = allReadings.count();
  var readingsSum = 0;
  allReadings.forEach(function(doc){
    readingsSum += doc.value;
  })
  var average = (readingsCount) ? readingsSum / readingsCount : null;
  HourlyAverage.upsert({sensor_id: sensor_id, time: lastHourMs}, {$set: {value: average}});
}



var findSensor = function(sensorID, currentIP){
  var thisSensor =  Sensors.findOne({sensorID: sensorID});
  if (thisSensor) {
    Sensors.update({_id: thisSensor._id}, {$set: {currentIP:currentIP}});
    return thisSensor._id;
  } else {
    return Sensors.insert({
      sensorID: sensorID,
      name: "",
      type: "",
      metric: "",
      currentIP: currentIP,
      desc: ""
    });
  }
}

var testReadingsAbove = function(occurencesRequired, occurences, value){
  var total = 0;
  occurences.forEach(function(doc){
    if(doc.value > value) total++;
  })
  return total >= occurencesRequired;
}
var testReadingsBelow = function(occurencesRequired, occurences, value){
  var total = 0;
  occurences.forEach(function(doc){
    if(doc.value < value) total++;
  })
  return total >= occurencesRequired;
}

var testAlarms = function(sensor_id){
  var allAlarms = Alarms.find({sensor_id: sensor_id, enabled:true, active: false});
  allAlarms.forEach(function(doc){
    switch(doc.alarmType){
      case "above":
        if(testReadingsAbove(4, Readings.find({sensor_id: doc.sensor_id}, {sort:{time:-1}, limit:5}), doc.value)) activateAlarm(doc._id);
        break;
      case "below":
        if(testReadingsBelow(4, Readings.find({sensor_id: doc.sensor_id}, {sort:{time:-1}, limit:5}), doc.value)) activateAlarm(doc._id);
        break;
      case "stop":
        var timeValue = new Date().getTime() - (doc.value * 60 * 1000); //Get the curent time, and subtract the determined test time from it
        var recentReading = Readings.findOne({sensor_id: doc.sensor_id, time: {$gte: timeValue}}); //Look for a reading from this sensor within the timeframe
        if(!recentReading){ //If no readings, set off this alarm
          activateAlarm(doc._id);
        }
        break;
    }
  })
  console.log("Tested Alarms");
}

var clearAlarms = function(sensor_id){
  var allAlarms = Alarms.find({sensor_id: sensor_id, enabled:true, active: true});
  allAlarms.forEach(function(doc){
    switch(doc.alarmType){
      case "above":
        if(!testReadingsAbove(4, Readings.find({sensor_id: doc.sensor_id}, {sort:{time:-1}, limit:5}), doc.value)) deactivateAlarm(doc._id);
        break;
      case "below":
        if(!testReadingsBelow(4, Readings.find({sensor_id: doc.sensor_id}, {sort:{time:-1}, limit:5}), doc.value)) deactivateAlarm(doc._id);
        break;
      case "stop":
        var timeValue = new Date().getTime() - (doc.value * 60 * 1000); //Get the curent time, and subtract the determined test time from it
        var recentReading = Readings.findOne({sensor_id: doc.sensor_id, time: {$gte: timeValue}}); //Look for a reading from this sensor within the timeframe
        if(recentReading){ //If there's a reading within the desired time frame, shut off this alarm
          deactivateAlarm(doc._id);
        }
        break;
    }
  })
  console.log("Cleared Alarms");
}


deactivateAlarm = function(alarm_id){
  Alarms.update({_id: alarm_id}, {$set: {active:false}});
}


activateAlarm = function(alarm_id){
  Alarms.update({_id: alarm_id}, {$set: {active:true}});
  var thisAlarm = Alarms.findOne({_id: alarm_id});
  if(thisAlarm.actions.sendEmail){
    sendEmailAlert(alarm_id);
  }
  if(thisAlarm.actions.sendSMS){
    sendSMSAlert(alarm_id);
  }
  if(thisAlarm.actions.sendIFTTT){
    sendIFTTTAlert(alarm_id);
  }
}

var sendIFTTTAlert = function(alarm_id){
  var thisAlarm = Alarms.findOne({_id: alarm_id});
  var thisSensor = Sensors.findOne({_id: thisAlarm.sensor_id});
  var latestReading = Readings.findOne({sensor_id: thisAlarm.sensor_id}, {sort:{time:-1}})
  var owner = Meteor.users.findOne({_id: thisAlarm.owner_id});
  var url = "https://maker.ifttt.com/trigger/greenhouse_alarm/with/key/" + owner.keys.IFTTT;
  HTTP.call('get', url, {data: {value1:thisSensor.name, value2: latestReading.value, value3: thisAlarm.name}});
}

var sendSMSAlert = function(alarm_id){
  // HTTP.call('get',
}

var sendEmailAlert = function(alarm_id){
  var thisAlarm = Alarms.findOne({_id: alarm_id});
  var thisSensor = Sensors.findOne({_id: thisAlarm.sensor_id});
  var latestReading = Readings.findOne({sensor_id: thisAlarm.sensor_id}, {sort:{time:-1}})
  var owner = Meteor.users.findOne({_id: thisAlarm.owner_id});

  var html = "<h2>You've received an alert from " + thisSensor.name + ".</h2> <h4>From the alarm for " + thisAlarm.name + ". The most recent reading is </h4><h3>" + CentigradeToFarenheit(latestReading.value) + " degrees F.</h3>";
  var text = "You've received an alert from " + thisSensor.name + ", from the alarm for " + thisAlarm.name + ". The most recent reading is " + CentigradeToFarenheit(latestReading.value) + " degrees F.";

  Email.send({
    from: "alerts@greenhouse.clayson.io",
    to: owner.emails[0].address,
    subject: "Alert from Greenhouse",
    text: html,
    html: text
  });
}

//Remove the login tokens from the Pi's user. Because Meteor doesn't clear the login tokens, and we're logging in every minute, this is becoming huge
var clearLoginToken = function(){
  console.log("Remove tokens from", Meteor.userId());
  Meteor.users.update({_id: Meteor.userId()}, {$set: {"services.resume.loginTokens":[]}});
}
