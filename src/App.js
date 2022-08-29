import "./App.css";
import { useState, useEffect } from "react";
import data from "./data/data.json";
import Bus from "./assets/bus-solid.svg";

const App = () => {
  const [lineOneData, setLineOneData] = useState([]);
  const [lineTwoData, setLineTwoData] = useState([]);

  useEffect(() => {
    const desiredLineOne = [];
    const desiredLineTwo = [];

    const lineOne = data
      .filter((item) => item.LineName === "Line 1")
      .sort((a, b) => a.StationID - b.StationID);

    let prevIteration = null;

    lineOne.forEach((item) => {
      if (prevIteration?.StationID === item.StationID) {
        const busValue = Array.isArray(
          desiredLineOne[Number(item.StationID) - 1].BusID
        )
          ? [...desiredLineOne[Number(item.StationID) - 1].BusID, item.BusID]
          : [desiredLineOne[Number(item.StationID) - 1].BusID, item.BusID];

        const busModel = Array.isArray(
          desiredLineOne[Number(item.StationID) - 1].BusID
        )
          ? [
              ...desiredLineOne[Number(item.StationID) - 1].BusModel,
              item.BusModel,
            ]
          : [
              desiredLineOne[Number(item.StationID) - 1].BusModel,
              item.BusModel,
            ];

        desiredLineOne[Number(item.StationID) - 1] = {
          ...desiredLineOne[Number(item.StationID) - 1],
          BusID: busValue,
          BusModel: busModel,
        };
      } else {
        desiredLineOne.push(item);
      }

      prevIteration = item;
    });

    const lineTwo = data
      .filter((item) => item.LineName === "Line 2")
      .sort((a, b) => a.StationID - b.StationID);

    lineTwo.forEach((item) => {
      if (prevIteration?.StationID === item.StationID) {
        const busValue = Array.isArray(
          desiredLineTwo[Number(item.StationID) - 1].BusID
        )
          ? [...desiredLineTwo[Number(item.StationID) - 1].BusID, item.BusID]
          : [desiredLineTwo[Number(item.StationID) - 1].BusID, item.BusID];

        const busModel = Array.isArray(
          desiredLineTwo[Number(item.StationID) - 1].BusID
        )
          ? [
              ...desiredLineTwo[Number(item.StationID) - 1].BusModel,
              item.BusModel,
            ]
          : [
              desiredLineTwo[Number(item.StationID) - 1].BusModel,
              item.BusModel,
            ];

        desiredLineTwo[Number(item.StationID) - 1] = {
          ...desiredLineTwo[Number(item.StationID) - 1],
          BusID: busValue,
          BusModel: busModel,
        };
      } else {
        desiredLineTwo.push(item);
      }

      prevIteration = item;
    });

    setLineOneData(desiredLineOne);
    setLineTwoData(desiredLineTwo);
  }, []);

  const Line = (data) => {
    return data.map((item, id) => {
      return (
        <div key={id} className="line-stations-wrapper">
          <div className="circle"></div>
          {data.length - 1 !== id && <div className="line"></div>}
          <div className="station-name">{item.StationName}</div>
          {Array.isArray(item.BusModel) ? (
            <div className="bus-group">
              {item.BusModel.map((model, id) => {
                return (
                  <div key={id} className="bus-group-content">
                    <img src={Bus} alt="bus" className="bus" />
                    <div className="bus-name">{model}</div>
                  </div>
                );
              })}
            </div>
          ) : item.BusModel ? (
            <div className="bus-group">
              <img src={Bus} alt="bus" className="bus" />
              <div className="bus-name">{item.BusModel}</div>
            </div>
          ) : (
            <div className="bus-group">
              <div className="bus-name">No Bus</div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Production Lines</h1>

      <div className="wrapper">
        <div className="line-wrapper one">
          <h2>Line One</h2>

          {Line(lineOneData)}
        </div>

        <div className="line-wrapper two">
          <h2>Line Two</h2>

          {Line(lineTwoData)}
        </div>
      </div>
    </div>
  );
};

export default App;
