"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  TimeInput,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import axios from "axios";
import { toast } from "react-toastify";

function ModalTutoring({
  isOpen,
  onOpen,
  onOpenChange,
  dataTutors,
  selectedDay,
  session,
}) {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedSubject, setSelecteSubject] = useState(null);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [hour, setHour] = useState(new Time(11, 10));

  const [isLoading, setIsLoading] = useState(false);

  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
  };

  const handleSubjectSelect = (subject) => {
    setSelecteSubject(subject);
    console.log(subject);
  };

  const handleRegisterTutoring = async (event) => {
    event.preventDefault();
    const tutoring = {
      name: name,
      reason: reason,
      date: selectedDay,
      hour: hour.toString(),
      status: true,
    };
    console.log(tutoring);
    setIsLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutoring/create-tutoring/${selectedSubject._id}/${selectedTutor._id}/${session?.user.userData._id}`,
        tutoring,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        onOpenChange(false);
        setName("");
        setReason("");
        setHour(new Time(11, 10));
        setSelectedTutor(null);
        setSelecteSubject(null);
        toast.success("Agendamiento realizado correctamente", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setName("");
    setReason("");
    setHour(new Time(11, 10));
    setSelectedTutor(null);
    setSelecteSubject(null);
    onOpenChange(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement={"center"}
        onOpenChange={handleCloseModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleRegisterTutoring}
                >
                  <div className="w-4/5 sm:w-full ">
                    <Input
                      className="bg-white rounded-xl mb-5"
                      fullWidth
                      isRequired
                      id="name"
                      label="Nombre tutoria"
                      type="text"
                      variant="filled"
                      margin="normal"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                      className="bg-white rounded-xl"
                      fullWidth
                      isRequired
                      id="reason"
                      label="Motivo"
                      type="text"
                      variant="filled"
                      margin="normal"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                    />

                    <div className="mt-5 flex flex-col">
                      <Dropdown className="w-full">
                        <DropdownTrigger>
                          <Button size="lg" variant="solid">
                            {selectedTutor ? selectedTutor.name : "Seleccione"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Static Actions"
                          onAction={(key) => handleTutorSelect(dataTutors[key])}
                        >
                          {dataTutors.map((tutor, index) => (
                            <DropdownItem key={index}>
                              {tutor.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    {selectedTutor && (
                      <div className="mt-5 flex flex-col ">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button size="lg" variant="solid">
                              {selectedSubject
                                ? selectedSubject.name
                                : "Seleccione Materia"}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            onAction={(key) =>
                              handleSubjectSelect(selectedTutor.subject[key])
                            }
                          >
                            {selectedTutor.subject.map((subject, index) => (
                              <DropdownItem key={index}>
                                {subject.name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}

                    <TimeInput
                      color="danger"
                      id="hour"
                      className="mt-5"
                      label="Hora tutoria"
                      defaultValue={new Time(11, 45)}
                      value={hour}
                      onChange={(event) => setHour(event)}
                    />

                    <div className="flex justify-end pt-5">
                      <Button
                        className="w-28"
                        variant="solid"
                        color="warning"
                        type="submit"
                        isLoading={isLoading}
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalTutoring;
