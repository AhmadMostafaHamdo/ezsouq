import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// Utility function for proper Arabic pluralization
const formatArabic = (number, unit) => {
  if (number === 1) return `1 ${unit.singular}`;
  if (number === 2) return `2 ${unit.dual}`;
  if (number >= 3 && number <= 10) return `${number} ${unit.plural}`;
  return `${number} ${unit.singular}`;
};
// Time calculation constants in seconds
const TIME_UNITS = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  MONTH: 2592000, // 30 days
  YEAR: 31536000, // 365 days
};

// Main component
function TimeAgo({ postDate }) {
  const [timeAgo, setTimeAgo] = useState("");
  const location = useLocation();

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const postDateObj = new Date(postDate);

      // Handle invalid date
      if (isNaN(postDateObj)) {
        setTimeAgo("");
        return;
      }

      const seconds = Math.floor((now - postDateObj) / 1000);

      // Handle future or very recent posts
      if (seconds < 5) {
        setTimeAgo("الآن");
        return;
      }

      // Arabic time units with singular, dual, plural forms
      const units = [
        {
          threshold: TIME_UNITS.YEAR,
          unit: { singular: "سنة", dual: "سنتين", plural: "سنوات" },
        },
        {
          threshold: TIME_UNITS.MONTH,
          unit: { singular: "شهر", dual: "شهرين", plural: "أشهر" },
        },
        {
          threshold: TIME_UNITS.DAY,
          unit: { singular: "يوم", dual: "يومين", plural: "أيام" },
        },
        {
          threshold: TIME_UNITS.HOUR,
          unit: { singular: "ساعة", dual: "ساعة", plural: "ساعات" },
        },
        {
          threshold: TIME_UNITS.MINUTE,
          unit: { singular: "دقيقة", dual: "دقيقتين", plural: "دقائق" },
        },
        {
          threshold: 1,
          unit: { singular: "ثانية", dual: "ثانيتين", plural: "ثوان" },
        },
      ];

      // Find the largest unit to display
      for (const { threshold, unit } of units) {
        if (seconds >= threshold) {
          const interval = Math.floor(seconds / threshold);
          setTimeAgo(formatArabic(interval, unit));
          return;
        }
      }
    };

    calculateTimeAgo();

    // Update every minute if the post is recent (< 1 day)
    const postDateObj = new Date(postDate);
    const now = new Date();
    const isRecent = now - postDateObj < TIME_UNITS.DAY * 1000;

    let timer;
    if (isRecent && !isNaN(postDateObj)) {
      timer = setInterval(calculateTimeAgo, 60000); // update every minute
    }

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [postDate]);

  // Display based on calculated time
  if (["الآن", "تاريخ غير صحيح"].includes(timeAgo)) {
    return <span className="text-red-800">{timeAgo}</span>;
  }

  return (
    <span className="text-red-800">
      {timeAgo} {location.pathname == "/search" ? "" : "مضت"}
    </span>
  );
}

export default TimeAgo;
