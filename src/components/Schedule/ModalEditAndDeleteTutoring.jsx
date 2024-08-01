import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import classNames from "classnames";

function ModalEditAndDelete({ session, isOpen, onOpenChange, tutoring }) {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("10:00");

  useEffect(() => {
    if (isOpen && tutoring) {
      setName(tutoring.name);
      setReason(tutoring.reason);
      setDate(new Date(tutoring.date));
      setHour(tutoring.hour);
    }
  }, [isOpen, tutoring]);

  const handleUpdateTutoring = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataTutoring = {
        name: name,
        reason: reason,
        date: date,
        hour: hour,
        status: true,
        student: tutoring.student,
        tutor: tutoring.tutor._id,
        subject: tutoring.subject._id,
      };
      const response = await axios.put(
        `${URLAPI}/tutoring/update-tutoring/${tutoring._id}`,
        dataTutoring,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      if (response.data.status === 200) {
        toast.success("Tutoria Actualizada", {
          position: "top-right",
          autoClose: 2000,
        });
        onOpenChange();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la tutoria", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTutoring = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await axios.delete(
        `${URLAPI}/tutoring/delete-tutoring/${tutoring._id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      if (response.data.status === 200) {
        toast.success("Tutoria Eliminada", {
          position: "top-right",
          autoClose: 2000,
        });
        onOpenChange();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la tutoria", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        size="lg"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Actualizar tutoria
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleUpdateTutoring}
                >
                  <div className="w-4/5 sm:w-full ">
                    <Input
                      className="bg-white rounded-xl mb-5"
                      fullWidth
                      isRequired
                      id="name"
                      label="Nombre"
                      type="text"
                      variant="filled"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      className="bg-white rounded-xl mb-5"
                      fullWidth
                      isRequired
                      id="reason"
                      label="Motivo"
                      type="text"
                      variant="filled"
                      margin="normal"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <div className="bg-white rounded-xl mb-5 w-full">
                      <label
                        htmlFor="date"
                        className="block text-gray-700 mb-2"
                      >
                        Fecha
                      </label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-full p-2 border rounded-xl"
                      />
                    </div>
                    <div className="bg-white rounded-xl mb-5 w-full">
                      <label htmlFor="hour">Hora</label>
                      <TimePicker
                        onChange={setHour}
                        value={hour}
                        disableClock
                        className="w-full p-2 mt-1 border rounded-xl"
                      />
                    </div>
                    <div className="flex justify-end pt-5 space-x-3">
                      <Button
                        className="w-28"
                        variant="solid"
                        color="danger"
                        isLoading={isLoadingDelete}
                        onClick={handleDeleteTutoring}
                      >
                        Eliminar
                      </Button>
                      <Button
                        className="w-28"
                        variant="solid"
                        color="success"
                        type="submit"
                        isLoading={isLoading}
                      >
                        Actualizar
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

export default ModalEditAndDelete;
