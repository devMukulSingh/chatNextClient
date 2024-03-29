import React from "react";
import { LuLoader2 } from "react-icons/lu";

const loading = () => {
  return (
    <div className="w-full justify-center mt-20 flex">
      <LuLoader2 className="animate-spin" />
    </div>
  );
};

export default loading;
