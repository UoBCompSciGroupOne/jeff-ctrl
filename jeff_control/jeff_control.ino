/* ---------- Libraries ---------- */

#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>
#include <Servo.h>


/* ---------- Setup ---------- */

// Initialises Arduino server and sets pins being used.
YunServer server;
int servoPin = 11;
int motorPin = 12;

// Initialises servo.
Servo jeffServo;
int pos = 90;

void setup() {

	// Makes sure LED is off.
	pinMode(servoPin, OUTPUT);
	digitalWrite(servoPin, LOW);
	pinMode(motorPin, OUTPUT);
	digitalWrite(motorPin, LOW);

	// Aligns the front wheels to the centre.
	jeffServo.attach(13);
	jeffServo.write(pos);
	delay(30);

	// Begins the bridge and sets the server to listen locally.
	Bridge.begin();
	server.listenOnLocalhost();
	server.begin();

}


/* ---------- Functions ---------- */

// Turns the front wheels to the left.
int turnLeft(int *deg) {

	int newPos = pos - *deg;

	if (newPos >= 0) {
		jeffServo.write(newPos);
		delay(15);
		pos = newPos;
		return 1;
	} else {
		return 0;
	}

}


// Turns the front wheels to the right.
int turnRight(int *deg) {

	int newPos = pos + *deg;

	if (newPos <= 180) {
		jeffServo.write(newPos);
		delay(15);
		pos = newPos;
		return 1;
	} else {
		return 0;
	}

}


// Handles the instruction sent.
int response(String *cmd, int *arg) {

	// Moves Jeff forwards.
	if (*cmd == "fwd") {

		digitalWrite(motorPin, HIGH);
		delay(*arg);
		digitalWrite(motorPin, LOW);
		return 1;

	// Moves Jeff backwards.
	} else if (*cmd == "bwd") {

		// Do backward stuff.
		return 1;

	// Turns Jeff's wheels left.
	} else if (*cmd == "lft") {

		return turnLeft(arg);

	// Turns Jeff's wheels right.
	} else if (*cmd == "rgt") {

		return turnRight(arg);

	}
		
	return 0;

}


/* ---------- Main Code ---------- */

void loop() {

	// Attempts to accept a connection.
	YunClient client = server.accept();

	// Processes client request.
	if (client) {

		// Reads the command from the client and trims whitespace.
		String request = client.readString();
		request.trim();

		// Retrieves the command and argument from the request.
		String cmd[3] = request.substring(0, 2);
		int arg = request.substring(4, 6).toInt();

		// Deals with the command.
		int success = response(cmd, &arg);

		if (success) {
			client.print("DONE");
		} else {
			client.print("ERROR");
		}

		// Closes the client connection.
		client.stop();

	}

	// Prevents overwork of processor.
	delay(50);

}
