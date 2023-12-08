import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

import Chart from "react-apexcharts";
import StakingCard from "./stakingcard";

const chartConfig = {
  type: "pie",
  width: 400,
  height: 400,
  series: [44, 55, 13, 43, 22],

  options: {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: true,
      position: "bottom",
    },
  },
};

const PortDashboard = () => {
  return (
    <div className="flex justify-around items-center mx-[40px] my-[0] mt-16">
      <div>
        <div className="flex justify-center items-center mb-4 font-serif font-extrabold text-3xl">
          TOTAL PORTFOLIO
        </div>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Pie Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize your data in a simple way using the
                @material-tailwind/react chart plugin.
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 font-serif font-extrabold text-3xl">
          STAKING REWARDS
        </div>
        <StakingCard />
      </div>
    </div>
  );
};

export default PortDashboard;
