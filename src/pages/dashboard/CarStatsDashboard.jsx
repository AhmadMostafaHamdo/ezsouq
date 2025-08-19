// src/components/CarStatsDashboard.jsx
import React from "react";
import { ResponsivePie } from "@nivo/pie";

const pieData = [
  { id: "عقارات", label: "إعلانات العقارات", value: 220, color: "#4c6ef5" },
  { id: "سيارات", label: "إعلانات السيارات", value: 320, color: "#5f3dc4" },
  { id: "منوعات", label: "إعلانات المنوعات", value: 87, color: "#748ffc" },
  {
    id: "إلكترونيات",
    label: "إعلانات الالكترونيات",
    value: 150,
    color: "#9775fa",
  },
];

const CarStatsDashboard = () => {
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  const CenteredMetric = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          fill: "#111",
        }}
      >
        {total}
      </text>
      <text
        x={centerX}
        y={centerY + 20}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "14px",
          fill: "#555",
        }}
      >
        إعلان منشور
      </text>
    </>
  );

  return (
    <div
      style={{
        background: "#f8f9fa",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "200px",
        margin: "auto",
      }}
    >
      <div style={{ height: "200px" }}>
        <ResponsivePie
          data={pieData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
