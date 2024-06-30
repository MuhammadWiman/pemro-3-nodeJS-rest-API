#include <ESP8266WiFi.h>
#include <PubSubClient.h>
// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to // Analog output pin that the LED is attached to

int sensorValue = 0;        // value read from the pot
int outputValue = 0; 

const char* ssid = "CUAKS";
const char* password = "123456789";
const char* mqtt_server = "103.167.112.188";

WiFiClient espClient;
PubSubClient client(espClient);
#define MSG_BUFFER_SIZE  (150)
char msg[MSG_BUFFER_SIZE];

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Menghubungkan ke ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi terhubung");
  Serial.println("Alamat IP: ");
  Serial.println(WiFi.localIP());
}
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
    
  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Menguhubungkan kembali MQTT ...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), "/iot:kelas_edp", "kelas_edp")) {
      Serial.println("terhubung");
      // Once connected, publish an announcemen t...
      // ... and resubscribe
      // client.subscribe("routing_edp_ahmad");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" mencoba kembali dalam 5 detik");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  // change the analog out value:
  analogRead(sensorValue);

  // print the results to the Serial Monitor:
  Serial.print("sensor = ");
  Serial.println(sensorValue);
  String convertData = String(sensorValue);
  char dataToMQTT[50];
  convertData.toCharArray(dataToMQTT, sizeof(dataToMQTT));
  String dataRMQ = String ("GAS-01") + "#" + dataToMQTT ;
  client.publish("routing_wiman&fadiah", dataRMQ.c_str());

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(1100);
}
