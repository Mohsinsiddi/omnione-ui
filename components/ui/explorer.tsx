import { useEffect, useState } from "react";
import { Payment, columns, ProjectDataType } from "./column";
import { DataTable } from "./explorerdata-table";
import axios from "axios";
import { useAccount } from "wagmi";
import { Project } from "@prisma/client";
interface ExplorerProps {}

const Explorer: React.FC<ExplorerProps> = () => {
  const { address, connector, isConnected } = useAccount();
  const [userActivities, setUserActivity] = useState<any[]>([]);
  const [allActivities, setAllActivities] = useState<any>([]);

  const [isUser, setIsUser] = useState(true);
  useEffect(() => {
    async function fetchActivity() {
      const allActivityData = await axios.get(`api/activity/all`);
      if (allActivityData.data) {
        const data = [];
        for (var i = 0; i < allActivityData.data.length; i++) {
          const projectData = await axios.get(
            `api/project?id=${allActivityData.data[i].projectId}`
          );
          const _data = projectData.data;
          data.push({ ..._data, status: "success" });
        }

        setAllActivities(data);
      } else {
        setAllActivities([]);
      }
    }

    async function fetchUserActivity() {
      const userActivityData = await axios.get(
        `api/activity/user?address=${address}`
      );
      if (userActivityData.data) {
        const data = [];
        for (var i = 0; i < userActivityData.data.length; i++) {
          const projectData = await axios.get(
            `api/project?id=${userActivityData.data[i].projectId}`
          );

          const _data = projectData.data;
          data.push({ ..._data, status: "success" });
        }
        setUserActivity(data);
      } else {
        setUserActivity([]);
      }
    }
    fetchActivity();
    fetchUserActivity();
  }, []);

  return (
    <div className="w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll border-[1px] border-gray-100 flex justify-center rounded-lg pt-2">
      <div className="container mx-auto py-2">
        <div className="flex mb-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setIsUser(true)}
              className="py-2 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setIsUser(false)}
              className="py-2 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
            >
              Global
            </button>
          </div>
        </div>
        {isUser ? (
          <DataTable columns={columns} data={userActivities} />
        ) : (
          <DataTable columns={columns} data={allActivities} />
        )}
      </div>
    </div>
  );
};

export default Explorer;
