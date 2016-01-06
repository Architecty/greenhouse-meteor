Sensors = new Meteor.Collection('sensors');
Readings = new Meteor.Collection('readings');
Alarms = new Meteor.Collection('alarms');
Alerts = new Meteor.Collection('alerts');

SensorSchema = new SimpleSchema({
  name: {
    type: String,
    label: "The name of the sensor"
  },
  sensorID: {
    type: String,
    label: "The ID registered by the Raspberry Pi"
  },
  type: {
    type: String,
    label: "The type of sensor, such as temp, moisture, etc"
  },
  metric: {
    type: String,
    label: "What does this receive as a reading? Degrees farenheit, celsius, moisture percentage, humidity, etc?"
  },
  desc: {
    type: String,
    label: "A more detailed description of what this sensor is tracking, and where it's tracking."
  },
  currentIP: {
    type: String,
    label: "The last reported IP address of this particular sensor"
  }
})

ReadingSchema = new SimpleSchema({
  sensor_id: {
    type: String,
    label: "The _id of the sensor this reading comes from"
  },
  value: {
    type: Number,
    label: "The value being returned from the sensor, regardless of what the number means"
  },
  time: {
    type: Number,
    label: "The time at which this reading was taken, in milliseconds"
  }
})

AlarmSchema = new SimpleSchema({
  sensor_id: {
    type: String,
    label: "The _id of the sensor this reading comes from."
  },
  alarmType: {
    type: String,
    label: "What type of alarm is this? Is it looking for something that's above, below, or hasn't happened for 'x' time?"
  },
  value: {
    type: Number,
    label: "The value that this alarm is checking for."
  },
  active: {
    type: Boolean,
    label: "Is this alarm currently active and ringing?"
  },
  enabled: {
    type: Boolean,
    label: "Is this alarm currently enabled?"
  },
  "actions.sendSMS": {
    type: Boolean,
    label: "Should this alarm send an SMS when it's triggered?"
  },
  "actions.sendEmail": {
    type: Boolean,
    label: "Should this alarm send an email when it's triggered?"
  }
});


AlertSchema = new SimpleSchema({
  alarm_id: {
    type: String,
    label: "The _id of the alarm that sent this alert"
  },
  startTime: {
    type: Number,
    label: "The time in ms when the alarm conditons began"
  },
  endTime: {
    type: Number,
    label: "The time in ms when the alarm conditions ended"
  }
});
