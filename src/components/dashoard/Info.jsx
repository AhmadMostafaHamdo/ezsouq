import { Link } from "react-router";

const Info = ({ title, img, number, type, link }) => {
  return (
    <div className="w-1/4 p-2 flex flex-col items-center gap-2 bg-white rounded-lg">
      <h1>{title}</h1>
      <img src={img} alt=""width={60}  />
      <div className="flex-center gap-5">
        {number}
        {type}
        <Link to={link}>عرض</Link>
      </div>
    </div>
  );
};

export default Info;
