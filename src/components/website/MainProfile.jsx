import Card from "./Card";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import { useSelector } from "react-redux";
const MainProfile = () => {
  const { products } = useSelector((state) => state.products);
  console.log("first")
  return (
    <div className="container pb-10">
      <ImgProfileWithButtons />
      <div className="w-full flex justify-start md:justify-evenly items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
        {products.map((product, index) => (
          <Card {...product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainProfile;
