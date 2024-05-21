"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";

function CardInfo() {
  return (
    <div className="flex justify-center mt-5 2xl:mt-10 w-full">
      <Card className=" bg-yellow-500/90 w-10/12 " shadow="lg" isBlurred >
        <CardHeader className="flex justify-center h-8">
          <div className="flex justify-center">
            <p className="text-md">Tutoria</p>
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
              <p>Fecha y hora</p>
              <p>Duracion estimada</p>
              <p>Nombre tutor</p>
              <p>Materia</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardInfo;
