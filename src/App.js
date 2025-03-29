import React, { useState, useEffect } from "react";
import PlayerStats from "./PlayerStats";

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
      <h1>Player Statistics Dashboard</h1>
      <PlayerStats 
        nameList={nameList} 
        totalPoints={totalPoints} 
        averagePoints={averagePoints} 
        totalMatches={totalMatches} 
        winnerCounts={winnerCounts} 
        loserCounts={loserCounts} 
      />
    </div>
  );
}

export default App;