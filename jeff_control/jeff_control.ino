/* ---------- Libraries ---------- */

#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>


/* ---------- Setup ---------- */

// Initialises Arduino server and sets pins being used.
YunServer server;
int motorOne = 10;
int motorTwo = 9;

void setup() {

	// Makes sure LED is off.
	pinMode(motorOne, OUTPUT);
	digitalWrite(motorOne, LOW);
	pinMode(motorTwo, OUTPUT);
	digitalWrite(motorTwo, LOW);

	// Begins the bridge and sets the server to listen locally.
	Bridge.begin();
	server.listenOnLocalhost();
	server.begin();

}


/* ---------- Functions ---------- */

// Handles the instruction sent.
int response(String *cmd, int *arg) {

	// Moves Jeff forwards.
	if (*cmd == "fwd") {

		digitalWrite(motorOne, HIGH);
		digitalWrite(motorTwo, HIGH);
		delay(*arg);
		digitalWrite(motorOne, LOW);
		digitalWrite(motorTwo, LOW);
		return 1;

	// Turns Jeff left.
	} else if (*cmd == "lft") {

		digitalWrite(motorOne, HIGH);
		delay(*arg);
		digitalWrite(motorOne, LOW);

	// Turns Jeff right.
	} else if (*cmd == "rgt") {

		digitalWrite(motorTwo, HIGH);
		delay(*arg);
		digitalWrite(motorTwo, LOW);

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
