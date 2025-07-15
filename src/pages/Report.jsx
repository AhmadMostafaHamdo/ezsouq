import { useEffect, useRef, useState } from "react";
import { reportData } from "../data/report";

const Report = () => {
  const [selected, setSelected] = useState(false);
  const [message, setMessage] = useState("");
  const report = useRef();
  useEffect(() => {
    report.current.scrollIntoView();
  }, []);
  return (
    <div
      ref={report}
      className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20] z-10"
    >
      <div>
        <div className="absolute rounded-xl font-normal p-5 z-20 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center">إبلاغ عن إعلان</h1>
          <div>
            {reportData.map((report, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="report"
                  id={report.id}
                  onChange={() => setSelected(true)}
                />
                
                <labelيرجى
                  توضيح
                  htmlFor={report.id}
                  className="text-[1rem] text-[#B9B5FF] mr-3"
                >
                  {report.label}
                </labelيرجى>
              </div>
            ))}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="يرجى توضيح الإبلاغ.."
              className="min-h-20 max-h-20 outline-none rounded-[5px] p-2 border border-solid-1 border-[#B9B5FF] my-4"
            ></textarea>
            <button
              disabled={!selected || message.length === 0}
              className={`block m-auto ${
                selected && message.length > 0 ? "bg-primary" : "bg-[#C5C5C5]"
              } text-white rounded-lg w-full p-1`}
            >
              إرسال الإبلاغ
            </button>
            <p className="font-normal text-[.8rem] text-center mt-2">
              الإبلاغ الكاذب قد يؤدي إلى تقييد حسابك
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
