import React from "react";

interface DateTimeDisplayProps {
  value: any;
  type: any;
  isDanger: any;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
}) => {
  return (
    <div
      className={
        isDanger
          ? "text-[#ff0000]"
          : "leading-5 px-1 py-[0] items-center flex flex-col"
      }
    >
      <p className="m-0">{value}</p>
      <span className="uppercase text-[0.5rem] leading-4">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
