#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

// Initialises Arduino server and sets pin being used.
YunServer server;
int servoPin = 10;
int motorPin = 11;

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


int response(String *cmd, int *arg) {

	if (*command == "fwd") {
		digitalWrite(motorPin, HIGH);
		delay(*arg);
		digitalWrite(motorPin, LOW);
	} else if (*command == "bwd") {
		// Do backward stuff.
	} else if (*command == "lft") {
		// Do servo stuff.
	} else if (*command == "rgt") {
		// Do servo stuff.
	} else {
		return 0;
	}

	return 1;

}


void loop() {

	// Attempts to accept a connection.
	YunClient client = server.accept();

	// Processes client request.
	if (client) {

		// Reads the command from the client and trims whitespace.
		String request = client.readString();
		request.trim();

		String cmd[3] = request.substring(0, 2);
		int arg = request.substring(4, 6).toInt();

		int success = response()

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
