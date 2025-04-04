import React, { useState, useEffect } from "react";
import PlayerStats from "./PlayerStats";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [totalPoints, setTotalPoints] = useState([]);
  const [averagePoints, setAveragePoints] = useState([]);
  const [totalMatches, setTotalMatches] = useState([]);
  const [winnerCounts, setWinnerCounts] = useState([]);
  const [loserCounts, setLoserCounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyBQvtMUDUrslnACV_QyIANxRmDgVPJPO7mouqv3VIYDedf7KXAJMObM91ihy7AKW8x/exec"
        );
        const text = await response.json();
        console.log(text)
        setData(text);

        const extractedNames = text[8].slice(5, 18);
        setNameList(extractedNames);

        const extractePoints = text[83].slice(5, 18);
        setTotalPoints(extractePoints);

        const extracteavgPoints = text[90].slice(5, 18);
        setAveragePoints(extracteavgPoints);

        const noOfmatches = text[92].slice(5, 18);
        setTotalMatches(noOfmatches);


        let winners = text.slice(9, 83).map(row => row[18]).filter(name => name && name !== "#N/A");
        let losers = text.slice(9, 83).map(row => row[19]).filter(name => name && name !== "#N/A");

        let winnerCountsMap = {};
        winners.forEach(name => {
          winnerCountsMap[name] = (winnerCountsMap[name] || 0) + 1;
        });

        let loserCountsMap = {};
        losers.forEach(name => {
          loserCountsMap[name] = (loserCountsMap[name] || 0) + 1;
        });

        extractedNames.forEach(name => {
          if (!winnerCountsMap[name]) winnerCountsMap[name] = 0;
          if (!loserCountsMap[name]) loserCountsMap[name] = 0;
        });

        let winnerArray = Object.entries(winnerCountsMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        let loserArray = Object.entries(loserCountsMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setWinnerCounts(winnerArray);
        setLoserCounts(loserArray);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="page-title">
        <img src="/Dream11_Vertical_WhiteonRedBG.jpg" alt="Battle of Champions" className="" />
        <h1 className="text-center text-2xl font-bold title-battle"></h1>
      </div>
      <div >
        <div className="width-50 ">
          <h2 className="header-title">Winner</h2>
          <div className="winner-table">
          <div className="point-parent">
          <p className="name">{data?.[2]?.[12] || "Unknown"}</p>
          <p className="point"> :   {data?.[1]?.[12] || "0"}</p>
          </div>
          </div>

        </div>
        <div className="width-50">
          <h2 className="text-center text-lg font-semibold mb-2 header-title">Loser</h2>
          <div className="winner-table looser">
          <div className="point-parent">
          <p className="name">{data?.[5]?.[12] || "Unknown"}</p>
          <p className="point"> :   {data?.[4]?.[12] || "0"}</p>
          </div>
          </div>
        </div>
        </div>
      
      <PlayerStats 
        extractedNames={nameList}
        totalPoints={totalPoints}
        averagePoints={averagePoints}
        winnerCounts={winnerCounts}
        loserCounts={loserCounts}
        totalMatches={totalMatches}
      />
    </div>
  );
}

export default App;