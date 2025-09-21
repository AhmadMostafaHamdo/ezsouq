import { useEffect } from "react";
import Card from "./Card";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { productsThunkForMe } from "../../store/product/thunk/productsThunkById";
const MainProfile = () => {
  const { productsById } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(productsThunkForMe(id));
    }
  }, [dispatch, id]);
  console.log(productsById);
  console.log(id);
  return (
    <div className="container pb-10">
      <ImgProfileWithButtons />
      <div className="w-full flex justify-start md:justify-evenly items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
        {productsById.map((product, index) => (
          <Card {...product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainProfile;
