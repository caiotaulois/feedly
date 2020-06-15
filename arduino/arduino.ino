#include <SPI.h>
#include <Ethernet.h>
#include <Servo.h>

const int pinoServo = 6;
Servo s;
int pos;

byte mac[] = { 0xAB, 0xCD, 0x12, 0x34, 0xFF, 0xCA };
IPAddress ip(192,168,137,177);
IPAddress gateway(192,168,0,1);
IPAddress subnet(255, 255, 255, 0);
EthernetServer server(80);

String readString;

void setup(){
  s.attach(pinoServo);
  s.write(6);
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
  Serial.begin(9600);
  Serial.println("Feedly");
}

void loop(){
  EthernetClient client = server.available();
  if (client) {
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.println(c);
        if (readString.length() < 100) {
          readString += c;
        }
        if (c == '\n') {
          Serial.println(readString);
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println();
          
          client.println("OK");

          delay(1);
          client.stop();
          
          s.write(30);
          delay(1000);
          s.write(6);
            
          readString="";
        }
      }
    }
  }
}