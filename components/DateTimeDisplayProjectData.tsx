import React from "react";

interface DateTimeDisplayProps {
  value: any;
  type: any;
  isDanger: any;
}

const DateTimeDisplayProjectData: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
}) => {
  return (
    <div
      className={
        isDanger
          ? "text-[#ff0000]"
          : "leading-7 px-2 py-[0] items-center flex flex-col"
      }
    >
      <p className="m-0">{value}</p>
      <span className="uppercase text-[1rem] leading-7">{type}</span>
    </div>
  );
};

export default DateTimeDisplayProjectData;
