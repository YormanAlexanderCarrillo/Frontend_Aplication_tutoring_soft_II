"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDisclosure } from "@nextui-org/react";
import ModalTutoring from "./ModalTutoring";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";

function CalendarEvents() {
  moment.locale("es");
  const { data: session, status } = useSession();
   const localizer = momentLocalizer(moment);
   const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState();
  const [ dataTutors, setDataTutors ] = useState([]);

  const styleEvent = (event) => {
    var backgroundColor = "#EAC107";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "10px",
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const events = [
    {
      title: "Tutoria",
      start: new Date(2024, 6, 2, 10, 0, 0),
      end: new Date(2024, 6, 2, 11, 0, 0),
    },
  ];

  const changeDate = (date) => {
    setDate(date);
  };

  const openModal = async (day) => {
    setSelectedDay(day.start)
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-tutors`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        setDataTutors(data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-10/12 sm:w-5/6 sm:h-3/4">
      <Calendar
        localizer={localizer}
        events={events}
        selectable={true}
        views={["month"]}
        date={date}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
        }}
        onNavigate={changeDate}
        eventPropGetter={styleEvent}
        onSelectSlot={(day) => openModal(day)}
      />
      <ModalTutoring
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        dataTutors={dataTutors}
        selectedDay={selectedDay}
        session = {session} 
      />
      <ToastContainer />
    </div>
  );
}

export default CalendarEvents