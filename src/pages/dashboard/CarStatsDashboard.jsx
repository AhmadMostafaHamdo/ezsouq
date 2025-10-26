// 🧩 CarStatsDashboard.jsx
// Comments in English only
// لوحة إحصائيات الإعلانات - Dashboard Statistics

import React, { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";

const CarStatsDashboard = () => {
  const { statisticCategories } = useSelector((state) => state.statistic);

  // ✅ Safely extract counts or default to 0
  const realEstate = statisticCategories?.[1]?.count || 0;
  const cars = statisticCategories?.[2]?.count || 0;
  const electronics = statisticCategories?.[3]?.count || 0;

  // ✅ Compute totals safely
  const total = realEstate + cars + electronics;

  // ✅ Prepare chart data using useMemo (optimization)
  const pieData = useMemo(
    () => [
      {
        id: "عقارات",
        label: "إعلانات العقارات",
        value: realEstate,
        color: "#4c6ef5",
      },
      {
        id: "سيارات",
        label: "إعلانات السيارات",
        value: cars,
        color: "#5f3dc4",
      },
      {
        id: "إلكترونيات",
        label: "إعلانات الإلكترونيات",
        value: electronics,
        color: "#9775fa",
      },
      {
        id: "منوعات",
        label: "إعلانات منوعة",
        value: total,
        color: "#748ffc",
      },
    ],
    [realEstate, cars, electronics, total]
  );

  // ✅ Inner metric text in the center of the pie
  const CenteredMetric = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 16, fontWeight: "bold", fill: "#111" }}
      >
        {total}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 10, fontWeight: "bold", fill: "#555" }}
      >
        إعلان منشور
      </text>
    </>
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: 350,
        margin: "10px auto 0",
        paddingLeft: 10,
      }}
      className="flex-col md:flex-row flex-between"
    >
      {/* ✅ Pie chart section */}
      <div style={{ height: 170, width: 240 }}>
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

      {/* ✅ Categories list below */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 20,
        }}
      >
        {pieData.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "#333",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: item.color,
                display: "inline-block",
              }}
            />
            <span>{item.label}</span>
            <strong style={{ marginLeft: 4 }}>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarStatsDashboard;
