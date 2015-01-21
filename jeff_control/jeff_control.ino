/* ---------- Libraries ---------- */

#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>


/* ---------- Setup ---------- */

// Initialises Arduino server and sets pins being used.
YunServer server;
// Motor control.
const int controlPin1 = 9;
const int controlPin2 = 10;
const int controlPin3 = 11;
const int controlPin4 = 12;
// Speed control.
const int enablePin = 3;

// Sets the default speed.
int motorSpeed = 500;

void setup() {

	// Sets motor control pins.
	pinMode(controlPin1, OUTPUT);
	pinMode(controlPin2, OUTPUT);
	pinMode(controlPin3, OUTPUT);
	pinMode(controlPin4, OUTPUT);

	// Sets the speed control pin.
	pinMode(enablePin, OUTPUT);
	digitalWrite(enablePin, LOW);

	// Begins the bridge and sets the server to listen locally.
	Bridge.begin();
	server.listenOnLocalhost();
	server.begin();

}


/* ---------- Functions ---------- */

void halt(void) {
  
        digitalWrite(controlPin1, LOW); 
	digitalWrite(controlPin2, LOW);
	digitalWrite(controlPin3, LOW);  
	digitalWrite(controlPin4, LOW);
  
}

// Moves Jeff left.
void left(int *time) {

	digitalWrite(controlPin1, HIGH); 
	digitalWrite(controlPin2, LOW);
	digitalWrite(controlPin3, HIGH);  
	digitalWrite(controlPin4, LOW);
	analogWrite(enablePin, motorSpeed);

	delay(*time);
        halt();

}


// Moves Jeff right.
void right(int *time) {

	digitalWrite(controlPin1, LOW);
	digitalWrite(controlPin2, HIGH);
	digitalWrite(controlPin3, LOW);  
	digitalWrite(controlPin4, HIGH);   
	analogWrite(enablePin, motorSpeed);

	delay(*time);
        halt();

}


// Moves Jeff forwards.
void forward(int *time) {

	digitalWrite(controlPin1, HIGH);
	digitalWrite(controlPin2, LOW);
	digitalWrite(controlPin3, LOW);  
	digitalWrite(controlPin4, HIGH);   
	analogWrite(enablePin, motorSpeed);

	delay(*time);
        halt();

}


// Moves Jeff backwards.
void backward(int *time) {

	digitalWrite(controlPin1, LOW);
	digitalWrite(controlPin2, HIGH);
	digitalWrite(controlPin3, HIGH);  
	digitalWrite(controlPin4, LOW);   
	analogWrite(enablePin, motorSpeed);

	delay(*time);
        halt();

}


// Handles the instruction sent.
int response(String *cmd, int *time) {

	if (*cmd == "fwd") {
		forward(time);
		return 1;
	} else if (*cmd == "bwd") {
		backward(time);
		return 1;
	} else if (*cmd == "lft") {
		left(time);
		return 1;
	} else if (*cmd == "rgt") {
		right(time);
		return 1;
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
		String cmd = request.substring(0, 3);
		String arg_string = request.substring(4, 7);
		
		float arg_float = arg_string.toFloat();
                arg_float = 1000.0*arg_float;
		int arg = (int) arg_float;
		

		// Deals with the command.
		int success = response(&cmd, &arg);

		// Returns response to user.
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
