/* ---------- Libraries ---------- */

#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>
#include <Servo.h>


/* ---------- Setup ---------- */

// Initialises Arduino server and sets pins being used.
YunServer server;
int servoPin = 10;
int motorPin = 11;

// Initialises servo.
Servo jeffServo;
int pos = 0;

void setup() {

	// Makes sure LED is off.
	pinMode(servoPin, OUTPUT);
	digitalWrite(servoPin, LOW);
	pinMode(motorPin, OUTPUT);
	digitalWrite(motorPin, LOW);

	// Begins the bridge and sets the server to listen locally.
	Bridge.begin();
	server.listenOnLocalhost();
	server.begin();

}


/* ---------- Functions ---------- */

// Turns the front wheels to the right.
void turnRight(int *deg) {

	for (pos = 0; pos <= *deg; pos++) {
		jeffServo.write(pos);
		delay(15);
	}

}


// Turns the front wheels to the left.
void turnLeft(int *deg) {

	for (pos = 0; pos <= *deg; pos--) {
		jeffServo.write(pos);
		delay(15);
	}

}


// Handles the instruction sent.
int response(String *cmd, int *arg) {

	if (*cmd == "fwd") {
		digitalWrite(motorPin, HIGH);
		delay(*arg);
		digitalWrite(motorPin, LOW);
	} else if (*cmd == "bwd") {
		// Do backward stuff.
	} else if (*cmd == "lft") {
		turnLeft(arg);
	} else if (*cmd == "rgt") {
		turnRight(arg);
	} else {
		return 0;
	}

	return 1;

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
