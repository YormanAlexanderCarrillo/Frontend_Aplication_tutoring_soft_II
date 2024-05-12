"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status]);

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            console.error(responseNextAuth.error);
            toast.error(responseNextAuth.error, {
                position: 'top-right',
                autoClose: 2000
            })
            return;
        }
        router.push("/dashboard");
    };

    if (status === "loading") {
        return <p>Loading...</p>;
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
                            onChange={(event) => setEmail(event.target.value)}
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
                            <Button className="w-28" variant="contained" color="warning" type="submit">
                                Ingresar
                            </Button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-end items-center sm:mr-10 p-8 sm:pt-10 sm:mb-5 space-x-3 sm:space-x-7 ">
                    <a className="text-white text-xs sm:text-base" href="">
                        ¿Olvidó su contraseña?
                    </a>
                    <Button href="/register" className="w-32 sm:w-28" variant="contained" color="info">
                        Registrarse
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginForm;