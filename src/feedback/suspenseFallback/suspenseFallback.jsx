import { Suspense } from "react";
import Loading from "../loading/Loading";

const SuspenseFallback = ({ children }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default SuspenseFallback;
