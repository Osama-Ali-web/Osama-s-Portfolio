import React from "react";

const FormRow = ({ children, lable, error, extend = false }) => {
  return (
    <div className={`${extend ? " col-span-2" : ""} space-y-2`}>
      <label className=" font-normal capitalize text-inherit">{lable}:</label>
      <div className=" space-y-2">
        {children}
        {error && <p className=" text-xs font-medium text-red-300">{error}</p>}
      </div>
    </div>
  );
};

export default FormRow;
