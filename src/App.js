import "./styles.css";
import React, { useState, Fragment } from "react";
import Chart from "./Chart.js";

var mqtt = require("mqtt");
var options = {
  protocol: "ws",
  username: "frank",
  password: "xnn7pegKJjf7IbCX",
  keepalive: 20, // clientId uniquely identifies client
  // choose any string you wish
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};

var client = mqtt.connect("wss://mqtts.hirrly.de:9001", options);

client.subscribe("/frank/device/50HzData");
client.subscribe("device/50HzData");
console.log("Client subscribed ");

function App() {
  const [data, setData] = useState("");

  const [msg, setMsg] = useState(
    <Fragment>
      {" "}
      <em>...</em>{" "}
    </Fragment>
  );

  var note;
  client.on("message", function (topic, message) {
    setData(0);
    note = message.toString(); // Updates React state with message

    var jsonval = JSON.parse(note);

    console.log(jsonval.Hz.toString());
    setMsg(jsonval.Hz.toString());
    var point = [{ x: Date.now(), y: jsonval.Hz }];
    setData(point);
    //client.end();
  });
  // Sets default React state
  //

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grid Watch</h1>
        <p>Grid Frequency is: {msg}Hz</p>
      </header>
      <Chart parentToChild={data} />
    </div>
  );
}

export default App;
