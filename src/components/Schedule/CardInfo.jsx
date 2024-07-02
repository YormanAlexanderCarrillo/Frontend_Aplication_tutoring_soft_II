"use client";
import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

function CardInfo({ tutoring }) {
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString();
  };
  return (
    <div className="flex justify-center mt-5 2xl:mt-10 w-full">
      <Card className=" bg-yellow-500/90 w-10/12 " shadow="lg" isBlurred>
        <CardHeader className="flex justify-center h-8">
          <div className="flex justify-center">
            <p className="text-md">Tutoría : {tutoring.name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-row justify-center space-x-10 pb-4">
            <div className="flex flex-col">
              <p>Fecha y hora</p>
              <p>Duracion estimada</p>
              <p>Nombre tutor</p>
              <p>Materia</p>
            </div>
            <div className="flex flex-col">
              <p>
                {formatDate(tutoring.date)} - {tutoring.hour}
              </p>
              <p>Duracion estimada</p>
              <p>{tutoring.tutor.name}</p>
              <p>{tutoring.subject.name}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardInfo;
