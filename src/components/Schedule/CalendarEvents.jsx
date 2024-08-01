"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDisclosure } from "@nextui-org/react";
import ModalTutoring from "./ModalTutoring";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import ModalEditAndDelete from "./ModalEditAndDeleteTutoring";

function CalendarEvents({ session, tutorings, reloadTutoring }) {
  moment.locale("es");
  const localizer = momentLocalizer(moment);
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenEditDelete, setIsOpenEditDelete] = useState(false);
  const [selectedTutoring, setSelectedTutoring] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [dataTutors, setDataTutors] = useState([]);

  const fetchTutors = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-tutors`,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setDataTutors(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [session.user.token]);

  useEffect(() => {
    if (isOpen) {
      fetchTutors();
    }
  }, [isOpen, fetchTutors]);

  useEffect(() => {
    reloadTutoring();
  }, [onOpenChange, isOpenEditDelete]);

  const styleEvent = (event) => ({
    style: {
      backgroundColor: "#EAC107",
      borderRadius: "10px",
      color: "black",
      border: "0px",
      display: "block",
    },
  });

  const events = tutorings.map((tutoring) => ({
    title: tutoring.name,
    start: new Date(tutoring.date),
    end: new Date(new Date(tutoring.date).getTime() + 60 * 60 * 1000),
    ...tutoring
  }));

  const changeDate = (date) => setDate(date);

  const openModal = (day) => {
    setSelectedDay(day.start);
    onOpen();
  };

  const handleSelectEvent = (tutoring) => {
    setSelectedTutoring(tutoring);
    setIsOpenEditDelete(!isOpenEditDelete);
  };

  return (
    <div className="w-10/12 sm:w-5/6 sm:h-3/4">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        views={["month"]}
        date={date}
        messages={{ next: "Siguiente", previous: "Anterior", today: "Hoy" }}
        onNavigate={changeDate}
        eventPropGetter={styleEvent}
        onSelectSlot={openModal}
        onSelectEvent={handleSelectEvent}
      />
      <ModalTutoring
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        dataTutors={dataTutors}
        selectedDay={selectedDay}
        session={session}
      />
      <ModalEditAndDelete
        isOpen={isOpenEditDelete}
        onOpenChange={()=>setIsOpenEditDelete(false)}
        tutoring={selectedTutoring}
        session={session}
      />
      <ToastContainer />
    </div>
  );
}

export default CalendarEvents;
