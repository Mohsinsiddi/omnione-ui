import React from "react";
import { useCountdown } from "../hooks/useCountdown";
import DateTimeDisplayProjectData from "./DateTimeDisplayProjectData";

const ExpiredNotice = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center p-8 border-[1px] border-[solid] border-[#ebebeb] rounded m-4">
        <span className="text-[2rem] font-extrabold text-[red]">SOLD OUT</span>
      </div>
    </div>
  );
};

const LiveNotice = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-4">
        <button
          type="button"
          onClick={() => {}}
          className="py-[8px] px-6 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-green-500 text-gray-700 align-middle hover:bg-green-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-lg dark:bg-green-300 dark:hover:bg-green-500 dark:border-gray-700 dark:text-gray-800"
        >
          MINT NFT
        </button>
      </div>
      <div className="text-center p-2 border-[1px] border-[solid] border-[#ebebeb] rounded m-2">
        <span className="text-[2rem] font-extrabold text-green-400">
          MINTING LIVE
        </span>
      </div>
    </div>
  );
};

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  duration: number;
}

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
  duration,
}) => {
  return (
    <div className="p-4">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row justify-center items-center font-bold text-[1.5rem] leading-7 p-4 border-[2px] border-[solid] border-[#4ba6bb] rounded no-underline text-gray-400] m-3"
      >
        <DateTimeDisplayProjectData
          value={days}
          type={"Days"}
          isDanger={days <= 2}
        />
        <p>:</p>
        <DateTimeDisplayProjectData
          value={hours}
          type={"Hours"}
          isDanger={false}
        />
        <p>:</p>
        <DateTimeDisplayProjectData
          value={minutes}
          type={"Mins"}
          isDanger={false}
        />
        <p>:</p>
        <DateTimeDisplayProjectData
          value={seconds}
          type={"Seconds"}
          isDanger={false}
        />
      </a>
    </div>
  );
};

interface CountdownTimerProps {
  targetDate: number;
  duration: number;
}

const CountdownTimerProjectData: React.FC<CountdownTimerProps> = ({
  targetDate,
  duration,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <div>{days >= -2 ? <LiveNotice /> : <ExpiredNotice />}</div>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        duration={duration}
      />
    );
  }
};

export default CountdownTimerProjectData;
