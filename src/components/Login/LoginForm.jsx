"use client";

import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Button, CircularProgress } from "@nextui-org/react";
import ModalRecoveryPassword from "./ModalRecoveryPassword";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError) {
      return;
    }
    setIsLoading(true);
    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      //console.error(responseNextAuth.error);
      toast.error(responseNextAuth.error, {
        position: "top-right",
        autoClose: 2000,
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/dashboard");
  };

  const register = () => {
    router.push("/register");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[A-Za-z0-9._%+-]+@uptc\.edu\.co$/;
    if (!emailRegex.test(value)) {
      setEmailError("Correo institucional debe ser @uptc.edu.co");
    } else {
      setEmailError("");
    }
  };

  const handleOnCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="warning" aria-label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black/80 rounded-lg w-5/6 sm:w-2/3 lg:w-4/12 ">
        <div className="flex mb-10 h-12 rounded-lg justify-center items-center bg-yellow-500">
          <h3>Inicio de sesión</h3>
        </div>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-4/5 sm:w-3/4">
            <TextField
              className="bg-white rounded-xl"
              fullWidth
              id="email"
              label="Correo institucional"
              type="email"
              variant="filled"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              className="bg-white rounded-xl"
              fullWidth
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
                className="w-28 flex space-x-2 justify-center "
                variant="solid"
                color="warning"
                type="submit"
                isLoading={isLoading}
              >
                Ingresar
              </Button>
            </div>
          </div>
        </form>
        <div className="flex justify-end items-center sm:mr-10 p-8 sm:pt-10 sm:mb-5 space-x-3 sm:space-x-7 ">
          <a
            className="text-white text-xs sm:text-base cursor-pointer"
            onClick={handleOnCloseModal}
          >
            ¿Olvidó su contraseña?
          </a>
          <Button
            onClick={register}
            className="w-32 sm:w-28"
            variant="solid"
            color="primary"
          >
            Registrarse
          </Button>
        </div>
      </div>
      <ModalRecoveryPassword
        isOpen={isOpenModal}
        onOpenChange={handleOnCloseModal}
      />
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
