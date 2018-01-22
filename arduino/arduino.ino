#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ArduinoOTA.h>
#include <ESP8266WebServer.h>

const char* ssid = "ssid";
const char* password = "password";
String device_name_0 = "Susan-Garage-0";
String device_data_0 = "UNHANDLED DEVICE_DATA";
String device_name_1 = "Susan-Garage-1";
String device_data_1 = "UNHANDLED DEVICE_DATA";

int trig0 = D0, echo0 = D1;
int trig1 = D2, echo1 = D3;
long duration, cm;

ESP8266WebServer server(301);

void setup() {
  Serial.begin(115200);
  pinMode(trig0, OUTPUT);
  pinMode(echo0, INPUT);
  pinMode(trig1, OUTPUT);
  pinMode(echo1, INPUT);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if(WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("WiFi Connect Failed! Rebooting...");
    delay(1000);
    ESP.restart();
  }
  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.println(WiFi.localIP());
  server.on("/", HTTP_OPTIONS, handleOptions);
  server.on("/", HTTP_GET, handleGet);
}

void handleOptions() {
  if (WiFi.status()== WL_CONNECTED) {   //Check WiFi connection status
    server.sendHeader("access-control-allow-credentials", "false");
    server.sendHeader("access-control-allow-headers", "x-requested-with,Authorization");
    server.sendHeader("access-control-allow-methods", "GET,OPTIONS");
    server.send(204);
  } else {
    Serial.println("Error in wifi connection");
  }
}

void handleGet() {
  if (WiFi.status()== WL_CONNECTED) {   //Check WiFi connection status
    server.sendHeader("Authorization", "pass");
    server.sendHeader("Content-Type", "application/x-www-form-urlencoded");
    digitalWrite(trig0, LOW);
    delayMicroseconds(5);
    digitalWrite(trig0, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig0, LOW);
   
    // Read the signal from the sensor: a HIGH pulse whose
    // duration is the time (in microseconds) from the sending
    // of the ping to the reception of its echo off of an object.
    pinMode(echo0, INPUT);
    duration = pulseIn(echo0, HIGH);
   
    // convert the time into a distance
    cm = (duration/2) / 29.1;
    if (cm == 0) {
      device_data_0 = "BAD SIGNAL, CHECK WIRING";
    } else if (cm > 60) {
      device_data_0 = "DOOR IS CLOSED";
    } else {
      device_data_0 = "DOOR IS OPEN";
    }
    digitalWrite(trig1, LOW);
    delayMicroseconds(5);
    digitalWrite(trig1, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig1, LOW);
   
    // Read the signal from the sensor: a HIGH pulse whose
    // duration is the time (in microseconds) from the sending
    // of the ping to the reception of its echo off of an object.
    pinMode(echo1, INPUT);
    duration = pulseIn(echo1, HIGH);
   
    // convert the time into a distance
    cm = (duration/2) / 29.1;
    if (cm == 0) {
      device_data_1 = "BAD SIGNAL, CHECK WIRING";
    } else if (cm > 60) {
      device_data_1 = "DOOR IS CLOSED";
    } else {
      device_data_1 = "DOOR IS OPEN";
    }
    //Serial.println("[{\"device_name\":\"" + device_name_0 + "\",\"device_data\":\"" + device_data_0 + "\"}, {\"device_name\":\"" + device_name_1 + "\",\"device_data\":\"" + device_data_1 + "\"}]");
    server.send(200, "text/json", "[{\"device_name\":\"" + device_name_0 + "\",\"device_data\":\"" + device_data_0 + "\"}, {\"device_name\":\"" + device_name_1 + "\",\"device_data\":\"" + device_data_1 + "\"}]");
  } else {
    Serial.println("Error in wifi connection");
  }
}

void loop() {
  server.handleClient();
}
