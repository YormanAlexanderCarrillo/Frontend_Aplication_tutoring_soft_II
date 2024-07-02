"use client";
import CalendarEvents from "@/components/Schedule/CalendarEvents";
import CardInfo from "@/components/Schedule/CardInfo";
import React from "react";

function SchedulePage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center items-center bg-yellow-500 mt-16">
        <h2>Agendamiento tutoría</h2>
      </div>
      <div className="flex flex-col pt-10 sm:flex-row 2xl:mt-4 h-full">
        <div className="flex justify-center pl-5 sm:pt-0 sm:w-1/2 sm:mt-0 h-full">
          <CalendarEvents />
        </div>
        <div className="flex justify-center sm:w-1/2 overflow-hidden">
          <div className="block w-full h-full overflow-y-scroll pb-28 space-y-4">
              <CardInfo />
              <CardInfo />
              <CardInfo />
              <CardInfo />
              <CardInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
