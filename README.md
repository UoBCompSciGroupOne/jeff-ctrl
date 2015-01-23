jeff-ctrl
=========

This repository contains the control software for Jeff, the programmable robot. It is divided into two parts: Arduino code to run on the microcontroller chip of the Arduino Yun, and a static website to be hosted by the built-in webserver on the Yun's Linux chip.

If you have python installed, there is a straightforward way to view the website without having to boot up Jeff. Navigate to the www/ directory of the project, and enter:

`python -m SimpleHTTPServer`

It should give you a port number. Then simply open a browser and navigate to:

`localhost:<port_number>`

How To Use Jeff
===============

To turn Jeff on press the button on the main battery (the black one). He will take up to two minutes to start up due to the fact that he has to launch his own WiFi hotspot. Then, on your tablet or computer, connect to the WiFi network that contains the word Yun and some numbers (the MAC address). From there, navigate to 192.168.240.1/sd/jeff_control/ in your browser.

## Troubleshooting

If the above does not result in him moving, there may be a problem with his hotspot. In this case, go to 192.168.240.1, and enter the password `arduino1`, and then click Configure. From there you may connect him to your own local WiFi network. He will give you a rebooting message and a progress bar. From this point you may access the website at the address given in the paragraph above.

Arduino Code
============

This is all contained within one file: jeff_control/jeff_control.ino. This code runs in a constant loop on the microcontroller chip, waits for commands to be passed through to it from the Linux chip, and controls the electronics based upon these commands.

Website
=======

The website is contained within the jeff_control/www/ directory. The root contains the webpages, and there are distinct subfolders for images, javascript and stylesheets.