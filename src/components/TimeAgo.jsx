import React, { useState, useEffect } from "react";

// Utility function for proper Arabic pluralization
const formatArabic = (number, unit) => {
  if (number === 1) return `1 ${unit.singular}`;
  if (number === 2) return `2 ${unit.dual}`;
  if (number >= 3 && number <= 10) return `${number} ${unit.plural}`;
  return `${number} ${unit.singular}`;
};

// Time calculation constants
const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH = 2592000; // 30 days
const YEAR = 31536000; // 365 days

function TimeAgo({ postDate }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const postDateObj = new Date(postDate);

      if (isNaN(postDateObj)) {
        setTimeAgo("تاريخ غير صحيح");
        return;
      }

      const seconds = Math.floor((now - postDateObj) / 1000);

      if (seconds < 0) {
        setTimeAgo("في المستقبل");
        return;
      }

      if (seconds < 5) {
        setTimeAgo("الآن");
        return;
      }

      const units = [
        {
          threshold: YEAR,
          unit: {
            singular: "سنة",
            dual: "سنتين",
            plural: "سنوات",
          },
        },
        {
          threshold: MONTH,
          unit: {
            singular: "شهر",
            dual: "شهرين",
            plural: "أشهر",
          },
        },
        {
          threshold: DAY,
          unit: {
            singular: "يوم",
            dual: "يومين",
            plural: "أيام",
          },
        },
        {
          threshold: HOUR,
          unit: {
            singular: "ساعة",
            dual: "ساعتين",
            plural: "ساعات",
          },
        },
        {
          threshold: MINUTE,
          unit: {
            singular: "دقيقة",
            dual: "دقيقتين",
            plural: "دقائق",
          },
        },
        {
          threshold: 1,
          unit: {
            singular: "ثانية",
            dual: "ثانيتين",
            plural: "ثوان",
          },
        },
      ];

      for (const { threshold, unit } of units) {
        if (seconds >= threshold) {
          const interval = Math.floor(seconds / threshold);
          setTimeAgo(formatArabic(interval, unit));
          return;
        }
      }
    };

    calculateTimeAgo();

    // Only set interval if time is recent (< 1 day)
    let timer;
    const now = new Date();
    const postDateObj = new Date(postDate);
    const isRecent = now - postDateObj < 86400000; // 1 day in ms

    if (isRecent && !isNaN(postDateObj)) {
      timer = setInterval(calculateTimeAgo, 60000);
    }

    return () => clearInterval(timer);
  }, [postDate]);

  // Handle display based on calculated value
  if (["الآن", "في المستقبل", "تاريخ غير صحيح"].includes(timeAgo)) {
    return <span className="text-red-800">{timeAgo}</span>;
  }

  return <span className="text-red-800">{timeAgo} مضت</span>;
}

export default TimeAgo;
