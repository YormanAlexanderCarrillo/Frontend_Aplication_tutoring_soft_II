'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      name: name,
      lastname: lastName,
      email: email,
      password: password,
    };

    if (!/^[a-zA-Z0-9._-]+@uptc\.edu\.co$/.test(email)) {
      toast.error("Por favor, ingrese un correo válido de la UPTC.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, user)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success("Registro exitoso 😃", {
            position: "top-right",
            autoClose: 2000,
          });

          setName("")
          setLastName("")
          setEmail("")
          setPassword("")

          setTimeout(() => {
            router.push("login");
          }, 2000);
        }else if(response.data.code == "auth/email-already-in-use"){
          toast.info("El Correo la esta registrado", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error en el registro 😢", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="bg-black/80 rounded-lg w-5/6 sm:w-2/3 lg:w-4/12 ">
        <div className="flex mb-10 h-12 rounded-lg justify-center items-center bg-yellow-500">
          <h3>Registro Estudiante</h3>
        </div>

        <form className="flex flex-col items-center" onSubmit={handleRegister}>
          <div className="w-4/5 sm:w-3/4">
            <Input
              className="bg-white rounded-xl mb-5"
              fullWidth
              isRequired
              id="name"
              label="Nombres"
              type="text"
              variant="filled"
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              className="bg-white rounded-xl mb-5"
              fullWidth
              isRequired
              id="lastName"
              label="Apellidos"
              type="text"
              variant="filled"
              margin="normal"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <Input
              className="bg-white rounded-xl mb-5"
              fullWidth
              isRequired
              id="email"
              label="Correo institucional"
              type="email"
              variant="filled"
              margin="normal"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              className="bg-white rounded-xl mb-5"
              fullWidth
              isRequired
              id="password"
              label="Contraseña"
              type="password"
              variant="filled"
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="flex justify-end pt-5">
              <Button
                className="w-28"
                variant="solid"
                color="warning"
                type="submit"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </form>
        <div className="flex justify-end items-center sm:mr-10 p-8 sm:pt-10 sm:mb-5 space-x-3 sm:space-x-7 ">
          <a className="text-white" href="/login">
            ¿Ya tienes una cuenta ingresa?
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
