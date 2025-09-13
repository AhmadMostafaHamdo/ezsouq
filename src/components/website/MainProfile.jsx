import { useEffect } from "react";
import Card from "./Card";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import { useDispatch, useSelector } from "react-redux";
import { productsThunkById } from "../../store/product/thunk/productsThunkById";
import { useParams } from "react-router";
const MainProfile = () => {
  const { products, productsById } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const {id}=useParams()
  useEffect(() => {
    dispatch(productsThunkById(id));
  }, []);
console.log(productsById);
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
