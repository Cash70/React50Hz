import "./styles.css";
import React from "react";
import "react-vis/dist/style.css";
import { useState, useEffect } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";

export default function Chart({ parentToChild }) {
  /*var initvals = [
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 15 }
  ];*/

  //var initvals = [{ x: Date.now(), y: 50 }];

  var [linedata, setlinedata] = useState();
  var [linedatafinal, setlinedatafinal] = useState();
  //var [linedataSliced, setlinedataSliced] = useState();
  //var point = { x: Date.now(), y: { parentToChild } };
  //var point = [{ x: 4, y: parentToChild }];
  //var point = { x: 4, y: 50.03 };
  useEffect(() => {
    if (parentToChild) {
      //var point = [{ x: Date.now(), y: parentToChild }];
      if (linedata) {
        console.log("Data" + parentToChild);
        var newdata = linedata.concat(parentToChild);
        //if (newdata.length > 3) var newdata2 = newdata.slice(1, 3);
        //else
        var newdata2 = newdata;
        //   console.log("lenght: " + newdata.length);
        //if (newdata.length >= 60) newdata2 = newdata.slice(1, 59);
        setlinedata(newdata2);
        //setlinedataSliced(...linedataSliced.slice(1,3));
      } else {
        setlinedata(parentToChild);
      }
    }
    //setlinedata([...linedata.slice(1, 3), point]);
  });

  useEffect(() => {
    //setlinedata([...linedata.slice(1, 3), point]);
    var linedata2;
    if (linedata) {
      if (linedata.length >= 300) linedata2 = linedata.slice(1, 299);
      else linedata2 = linedata;
      setlinedatafinal(linedata2);
      setlinedata(linedata2);
    }
  }, [linedata]);

  //tickValues={[0, 1.5, 2, 3, 4]}

  /* const axisStyle = {
    ticks: {
      fontSize: "14px",
      color: "#333",
    },
    title: {
      fontSize: "16px",
      color: "#333",
    },
  };*/
  const axisStyle = {
    ticks: {
      stroke: "blue", // Farbe der Tick-Linien
    },
    text: {
      fill: "blue", // Farbe der Tick-Beschriftung
      fontSize: 14,
    },
    title: {
      fill: "#88ffff", // Farbe des Titels
      fontSize: 16,
    },
    line: {
      stroke: "orange", // Farbe der Achsenlinie
    },
  };

  return (
    <center>
      <XYPlot width={400} height={300} yDomain={[49.8, 50.2]}>
        <HorizontalGridLines
          style={{
            stroke: "#999999",
            strokeWidth: 1,
          }}
        />
        <XAxis
          hideLine
          title="Hz"
          labelFormat={(v) => `Value is ${v}`}
          labelValues={[]}
          tickValues={[]}
          style={axisStyle}
        />
        <YAxis left={50} />
        <YAxis
          left={50}
          style={{
            line: {
              stroke: "#666666",
              strokeWidth: 1,
            },
            ticks: {
              stroke: "#ff4444",
            },
            text: {
              fill: "#ffffff",
              fontSize: 12,
            },
          }}
        />
        <LineSeries data={linedatafinal} color="#88ffff" />
      </XYPlot>
    </center>
  );
}
