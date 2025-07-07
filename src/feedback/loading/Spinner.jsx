const Spinner = ({ className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="spinner-inner"></div>
  </div>
);

export default Spinner;
