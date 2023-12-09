import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../hooks/useCountdown";
import { useRouter } from "next/navigation";
import { button } from "@material-tailwind/react";

const ExpiredNotice = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={() => {}}
          className="py-[1px] px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-gray-500 text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
        >
          VIEW PROJECT
        </button>
      </div>
      <div className="text-center p-2 border-[1px] border-[solid] border-[#ebebeb] rounded m-2">
        <span className="text-[1rem] font-extrabold text-[red]">SOLD OUT</span>
      </div>
    </div>
  );
};

interface LiveNoticeProps {
  data: string;
}

const LiveNotice: React.FC<LiveNoticeProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={() => {
            router.push(`/project/${data}`);
          }}
          className="py-[1px] px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-gray-500 text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
        >
          MINT NFT
        </button>
      </div>
      <div className="text-center p-2 border-[1px] border-[solid] border-[#ebebeb] rounded m-2">
        <span className="text-[1rem] font-extrabold text-green-400">
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
  cid: string;
}

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
  duration,
  cid,
}) => {
  const router = useRouter();
  return (
    <div className="p-1">
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={() => {
            router.push(`/project/${cid}`);
          }}
          className="py-[1px] px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-gray-500 text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
        >
          VIEW MINT DETAILS
        </button>
      </div>
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row justify-center items-center font-bold text-[0.75rem] leading-4 p-1 border-[1px] border-[solid] border-[#ebebeb] rounded no-underline text-gray-400]"
      >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 2} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

interface CountdownTimerProps {
  targetDate: number;
  duration: number;
  cid: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  duration,
  cid,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <div>{days >= -2 ? <LiveNotice data={cid} /> : <ExpiredNotice />}</div>
    );
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        duration={duration}
        cid={cid}
      />
    );
  }
};

export default CountdownTimer;
