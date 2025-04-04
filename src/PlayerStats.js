import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

const CustomBarChart = ({ data, title, color }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  return (
    <div className="mb-10 px-[15%] w-[70%] mx-auto">
      <h2 className="text-center text-xl font-bold mb-4 header-title">{title}</h2>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={sortedData} layout="vertical" margin={{ right: 100 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontWeight: "bold" }} />
          <YAxis
            dataKey="name"
            type="category"
            width={250}
            interval={0} 
            tick={{ dx: -10, fontSize: 14, fontWeight: "bold" }}
          />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[5, 5, 0, 0]}>
            <LabelList dataKey="value" position="right" style={{ fontWeight: "bold" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const PlayerStats = ({ extractedNames, totalPoints, averagePoints, totalMatches, winnerCounts, loserCounts }) => {
  const totalPointData = extractedNames.map((name, index) => ({
    name,
    value: Number(totalPoints[index]) || 0,
  }));

  const averagePointData = extractedNames.map((name, index) => ({
    name,
    value: Number(averagePoints[index]) || 0,
  }));

  const totalMatchData = extractedNames.map((name, index) => ({
    name,
    value: Number(totalMatches[index]) || 0,
  }));

  const winnerData = winnerCounts.map(({ name, count }) => ({
    name,
    value: count,
  }));

  const loserData = loserCounts.map(({ name, count }) => ({
    name,
    value: count,
  }));

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-10 font-[Poppins]">
      <CustomBarChart data={totalPointData} title="Total Score per Player" color="#22c55e" />
      <CustomBarChart data={averagePointData} title="Average Points per Player" color="#facc15" />
      <CustomBarChart data={totalMatchData} title="Total Matches per player" color="#3b82f6" />
      <CustomBarChart data={winnerData} title="Total Victories per Player" color="#22c55e" />
      <CustomBarChart data={loserData} title="Total Defeats per Player" color="#ef4444" />
    </div>
  );
};

export default PlayerStats;
