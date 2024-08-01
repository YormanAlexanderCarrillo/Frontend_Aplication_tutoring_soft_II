"use client";

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import { useSession } from "next-auth/react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [dataTutoring, setDataTutorings] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getTutorings();
    }
  }, [status]);

  const getTutorings = async () => {
    try {
      const response = await axios.get(
        `${URLAPI}/tutoring/get-all-tutoring-by-student/${session.user.userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setDataTutorings(data);
    } catch (error) {
      console.error("Error fetching tutorings:", error);
    }
  };

  const processData = (data) => {
    const dates = data.map((item) => moment(item.date).format("YYYY-MM"));
    const groupedDates = dates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(groupedDates);
    const values = Object.values(groupedDates);

    return { labels, values };
  };

  const processDataForActiveInactive = (data) => {
    const activeCount = data.filter(item => item.status).length;
    const inactiveCount = data.filter(item => !item.status).length;

    return {
      labels: ['Activos', 'Inactivos'],
      values: [activeCount, inactiveCount],
    };
  };

  const { labels, values } = processData(dataTutoring);
  const activeInactiveData = processDataForActiveInactive(dataTutoring);

  const data1 = {
    labels,
    datasets: [
      {
        label: "Cantidad de tutorías por Mes",
        data: values,
        backgroundColor: "rgba(238, 181, 1, 0.8)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
      },
    ],
  };

  const data2 = {
    labels: activeInactiveData.labels,
    datasets: [
      {
        label: "Tutorías Activas e Inactivas",
        data: activeInactiveData.values,
        backgroundColor: [ "rgba(238, 181, 1, 0.8)", "rgba(0, 0, 0, 0.7)"],
        borderColor: [ "rgba(255, 255, 0, 1)", "rgba(0, 0, 0, 1)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 h-3/5 w-11/12">
      <div className="flex flex-col sm:flex-row h-full space-y-10 sm:space-y-0 sm:space-x-10">
        <div className="w-full sm:w-1/2 pr-2 h-1/2 sm:h-full">
          <h3 className="text-xl font-semibold mb-4">
            Cantidad de tutorías por Mes
          </h3>
          <div className="w-full h-full">
            <Bar 
              data={data1}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 pl-2 h-1/2 sm:h-full">
          <h3 className="text-xl font-semibold mb-4">
            Tutorías Activas e Inactivas
          </h3>
          <div className="w-full h-full">
            <Pie 
              data={data2}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
