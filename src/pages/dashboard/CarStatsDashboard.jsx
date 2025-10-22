// src/components/CarStatsDashboard.jsx
import React, { useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";

const CarStatsDashboard = () => {
  const { statisticCategories } = useSelector((state) => state.statistic);
  const pieData = [
    {
      id: "عقارات",
      label: "إعلانات العقارات",
      value: statisticCategories[1]?.count,
      color: "#4c6ef5",
    },
    {
      id: "سيارات",
      label: "إعلانات السيارات",
      value: statisticCategories[2]?.count,
      color: "#5f3dc4",
    },
    {
      id: "منوعات",
      label: "إعلانات المنوعات",
      value:
        statisticCategories[1]?.count +
        statisticCategories[1]?.count +
        statisticCategories[2]?.count,
      color: "#748ffc",
    },
    {
      id: "إلكترونيات",
      label: "إعلانات الالكترونيات",
      value: statisticCategories[1]?.count,
      color: "#9775fa",
    },
  ];

  const total =
    statisticCategories[1]?.count +
    statisticCategories[1]?.count +
    statisticCategories[2]?.count;

  const CenteredMetric = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          fill: "#111",
        }}
      >
        {total}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "10px",
          fill: "#555",
          fontWeight: "bold",
        }}
      >
        إعلان منشور
      </text>
    </>
  );

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "350px",
        margin: "10px auto 0",
        paddingLeft: "10px",
      }}
      className="flex-col md:flex-row flex-between"
    >
      <div style={{ height: "170px", width: "240px" }}>
        <ResponsivePie
          data={pieData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerRadius={0.75}
          padAngle={0.7}
          cornerRadius={3}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          colors={{ datum: "data.color" }}
          activeOuterRadiusOffset={8}
          layers={["arcs", CenteredMetric]}
        />
      </div>

      {/* القائمة أسفل */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {pieData.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: item.color,
                display: "inline-block",
              }}
            />
            <span>{item.label}</span>
            <strong style={{ marginLeft: "4px" }}>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarStatsDashboard;
