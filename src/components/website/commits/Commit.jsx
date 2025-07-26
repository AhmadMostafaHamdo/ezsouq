import React, { useState } from "react";
import cat from "../../../assets/images/cat.svg";
import arrowTopCommit from "../../../assets/images/arrowTopCommit.svg";
import arrowBottomCommit from "../../../assets/images/arrowBottomCommit.svg";
import replayCommit from "../../../assets/images/replayCommit.svg";
import TimeAgo from "../../TimeAgo";
const Commit = ({ comment, createdAt,user }) => {
  const [arrowCommit, setArroCommit] = useState(false);
  
  return (
    <div className="flex gap-2 mt-4 pb-10">
      <img src={cat} alt="" className="w-16 h-16 object-cover" />
      <div className="flex flex-col">
        <div className="flex">
          <span className="text-primary font-bold text-[1.25rem] ml-3">
           {user?.name}
          </span>
          <span className="font-normal text-[1rem] text-[#716D97]">
            <TimeAgo postDate={createdAt} />
          </span>
        </div>
        <p>{comment}</p>
        <p className="flex items-center gap-1 font-normal text-[1rem] text-[#615D81]">
          عرض الردود (1)
          <div onClick={() => setArroCommit(!arrowCommit)}>
            {arrowCommit ? (
              <img src={arrowTopCommit} alt="" />
            ) : (
              <img src={arrowBottomCommit} alt="" />
            )}{" "}
          </div>
          <img src={replayCommit} alt="" className="mr-4" />
        </p>
      </div>
    </div>
  );
};

export default Commit;
