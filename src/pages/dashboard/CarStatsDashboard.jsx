import React, { useEffect, useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useDispatch, useSelector } from "react-redux";
import { statisticThunkCategory } from "../../store/statistic/thunk/statisticThunkCategory";

const CarStatsDashboard = () => {
  const dispatch = useDispatch();
  const { statisticCategories = [], loading } = useSelector(
    (state) => state.statistic
  );

  // Load data once if empty
  useEffect(() => {
    if (!statisticCategories || statisticCategories.length === 0) {
      dispatch(statisticThunkCategory());
    }
  }, [dispatch, statisticCategories]);

  // Helper to get count by category name
  const getCount = (name) =>
    statisticCategories.find(
      (item) => item.category?.toLowerCase() === name.toLowerCase()
    )?.count || 0;

  // Memoize chart data to prevent unnecessary re-renders
  const pieData = useMemo(() => {
    const cars = getCount("سيارات");
    const mobiles = getCount("موبايلات");
    const realEstate = getCount("عقارات");
    const electronics = getCount("إلكترونيات");

    // Other categories (not in the main list)
    const known = ["سيارات", "موبايلات", "عقارات", "إلكترونيات"];
    const others = statisticCategories
      .filter((item) => !known.includes(item.category))
      .reduce((sum, item) => sum + (item.count || 0), 0);

    const total = cars + mobiles + realEstate + electronics + others;

    return {
      total,
      data: [
        { id: "سيارات", label: "إعلانات السيارات", value: cars, color: "#4c6ef5" },
        { id: "موبايلات", label: "إعلانات الموبايلات", value: mobiles, color: "#9775fa" },
        { id: "عقارات", label: "إعلانات العقارات", value: realEstate, color: "#5f3dc4" },
        { id: "إلكترونيات", label: "إعلانات الإلكترونيات", value: electronics, color: "#748ffc" },
        { id: "منوعات", label: "إعلانات منوعة", value: others, color: "#82c91e" },
      ].filter((item) => item.value > 0),
    };
  }, [statisticCategories]);

  const CenteredMetric = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 16, fontWeight: "bold", fill: "#111" }}
      >
        {pieData.total}
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

  if (loading)
    return (
      <div className="text-center p-6 text-gray-500">
        ...جاري تحميل الإحصاءات
      </div>
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
    >
      {/* Pie chart */}
      <div style={{ height: 120, width: 130, margin: "auto" }}>
        <ResponsivePie
          data={pieData.data}
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

      {/* Categories list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: -13,
        }}
      >
        {pieData.data.map((item) => (
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
