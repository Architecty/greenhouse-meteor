# greenhouse-meteor
The Meteor Web-app for a simple greenhouse monitoring tool. Requires a raspberry pi with one or more temperature sensors running [Greenhouse-Pi](https://github.com/Architecty/greenhouse-Pi).

This is a [MeteorJS](https://www.meteor.com) app. To install the application on your own server, please follow the instructions [here](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx), or use [MUP](https://github.com/arunoda/meteor-up). 

Once you have the application installed, create your first user using `yourhost.com/signup`. This is what you use to log in.

Next, you'll need to add a controller, which currently means a Raspberry Pi. To begin, click the list symbol at the top right to go to the controller list view. Next, choose 'Add Your First Controller'.



//Old//

You'll use this user to authetiticate your [Raspberry Pi](https://github.com/Architecty/greenhouse-Pi). Add the email and password to the config file on your Raspberry Pi, using the [Greenhouse Pi Instructions](https://github.com/Architecty/greenhouse-Pi). 

Next, create your personal user, again using `yourhost.com/signup`. Technically, you could use the same account for both, but it would mean changing the password in the config file anytime you changed your own. 

With the Meteor app running and your Pi set up, 
