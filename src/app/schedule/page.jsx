"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import CalendarEvents from "@/components/Schedule/CalendarEvents";
import CardInfo from "@/components/Schedule/CardInfo";
import { CircularProgress } from "@nextui-org/react";

function SchedulePage() {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [tutorings, setTutorings] = useState([]);
  const [reloadTutorings, setReloadTutorings] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getTutorings();
    }
  }, [reloadTutorings]);


  const reloadTuto = () => {
    setReloadTutorings(!reloadTutorings);
  };

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
      setTutorings(data);
      //console.log(data);
    } catch (error) {
      console.error("Error fetching tutorings:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="warning" aria-label="Loading..." />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center items-center bg-yellow-500 mt-16">
        <h2>Agendamiento tutoría</h2>
      </div>
      <div className="flex flex-col pt-10 sm:flex-row 2xl:mt-4 h-full">
        <div className="flex justify-center pl-5 sm:pt-0 sm:w-1/2 sm:mt-0 h-full">
          <CalendarEvents
            session={session}
            tutorings={tutorings}
            reloadTutoring={reloadTuto}
          />
        </div>
        <div className="flex justify-center sm:w-1/2 overflow-hidden">
          <div className="block w-full h-full overflow-y-scroll pb-28 space-y-4">
            {tutorings.length !== 0 ? (
              tutorings.map((tutoring, index) => (
                <CardInfo key={index} tutoring={tutoring} />
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p>No hay tutorías agendadas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
