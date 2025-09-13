// src/feedback/loading/Spinner.jsx
const Spinner = ({ size = 40, className = "" }) => {
  // size بالبيكسل
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="spinner-inner border-4 border-t-primary border-gray-300 rounded-full animate-spin"
        style={spinnerStyle}
      ></div>
    </div>
  );
};

export default Spinner;
