import React, { useEffect, useState } from "react";
import { productThunkOrderd } from "../store/product/thunk/productThunkOrdered";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/website/Card";
const Newest = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    order: "desc",
    city: "",
    sortBy: "price",
    page: 1,
    limit: 8,
  });
  useEffect(() => {
    dispatch(productThunkOrderd(filters));
  }, [dispatch]);
  const { productOrdered = [] } = useSelector((state) => state.products);
  console.log(productOrdered);
   
  return (
    <div className="py-20">
      <div className="container flex-between flex-wrap gap-5">
        {productOrdered?.products.map((product) => (
          <Card {...product} />
        ))}
      </div>
    </div>
  );
};

export default Newest;
