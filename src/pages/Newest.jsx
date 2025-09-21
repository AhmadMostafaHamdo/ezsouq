import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/website/Card";
import { productThunk } from "../store/product/thunk/productThunk";
const Newest = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    order: "desc",
    city: "",
    sortBy: "price",
    page: 1,
    limit: 3,
  });
    const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(productThunk(filters));
  }, [dispatch]);
  const { products = [] } = useSelector((state) => state.products);

  return (
    <div className="py-20">
      <div className="container flex-between flex-wrap gap-5">
        {products?.map((product) => (
          <Card {...product} />
        ))}
      </div>
    </div>
  );
};

export default Newest;
