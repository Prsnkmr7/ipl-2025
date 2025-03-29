import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PlayerStats = ({ nameList, totalPoints, averagePoints, totalMatches, winnerCounts, loserCounts }) => {
  // Transform Data for Charts
  const chartData = nameList.map((name, index) => ({
    name,
    totalPoints: Number(totalPoints[index]) || 0,
    avgPoints: Number(averagePoints[index]) || 0,
    totalMatches: Number(totalMatches[index]) || 0,
  }));

  // Data for Win/Loss Horizontal Bar Chart
  const winLossData = winnerCounts.map((winner) => {
    const loser = loserCounts.find(loser => loser.name === winner.name) || { count: 0 };
    return { name: winner.name, wins: winner.count, losses: loser.count };
  });

  return (
    <div className="container">
      <h2>Player Stats Visualization</h2>

      {/* Bar Chart: Total Points */}
      <h3>Total Points per Player</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalPoints" fill="#8884d8">
            <LabelList dataKey="totalPoints" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart: Average Points */}
      <h3>Average Points per Match</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgPoints" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

    {/* Pie Chart: Total Matches */}
<h3>Total Matches per Player</h3>
<ResponsiveContainer width="100%" height={600}>  {/* Increased height */}
  <PieChart>
    <Pie
      data={chartData}
      dataKey="totalMatches"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={180}  // Increased outer radius
      fill="#8884d8"
      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)})`}
    >
      {chartData.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

{/* Horizontal Bar Chart: Winner & Loser Count */}
<h3>Winner & Loser Count</h3>
<ResponsiveContainer width="100%" height={500}>
  <BarChart
    data={winLossData}
    layout="vertical"
    margin={{ top: 20, right: 30, left: 50, bottom: 20 }} // Added bottom margin
    barCategoryGap={15} // Increases space between bars
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="number" />
    <YAxis dataKey="name" type="category" />
    <Tooltip />
    <Legend />
    <Bar dataKey="wins" fill="#4CAF50" stackId="a" barSize={20}> {/* Adjust barSize */}
      <LabelList dataKey="wins" position="right" />
    </Bar>
    <Bar dataKey="losses" fill="#F44336" stackId="a" barSize={20}> {/* Adjust barSize */}
      <LabelList dataKey="losses" position="right" />
    </Bar>
  </BarChart>
</ResponsiveContainer>

    </div>
  );
};

export default PlayerStats;
