"use client";
import LaunchForm from "@components/launchform";
import ProjectExplorer from "@components/projectexplorer";
import { useState } from "react";

function Page() {
  const [isExplorer, setIsExplorer] = useState(true);
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-center items-center">
        {" "}
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setIsExplorer(true)}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Project Explorer
          </button>

          <button
            type="button"
            onClick={() => setIsExplorer(false)}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Launch Project
          </button>
        </div>
      </div>
      <div>{!isExplorer ? <LaunchForm /> : <ProjectExplorer />}</div>
    </div>
  );
}

export default Page;
