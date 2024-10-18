import * as React from "react";
import { forwardRef } from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";

export const Input: React.FC<IProjectDetailProps> = forwardRef(function Input(
  { label, isTextArea, ...props },
  ref
) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-gray-300 bg-gray-200 text-gray-600 focus:outline-none focus:border-gray-600";

  return (
    <>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-gray-500">
          {label}
        </label>
        {isTextArea ? (
          <textarea ref={ref} className={classes} {...props} />
        ) : (
          <input ref={ref} className={classes} {...props} />
        )}
      </p>
    </>
  );
});
