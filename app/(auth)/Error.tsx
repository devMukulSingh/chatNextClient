import React from "react";

const Error = ({ error }: { error?: string }) => {
  return <p className="text-red-600 text-sm text-semibold">{error}</p>;
};

export default Error;
