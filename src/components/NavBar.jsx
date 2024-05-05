import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <div>
      <nav className="bg-zinc-800/85 ">
        <div className="flex items-center justify-center space-x-10 h-16">
          <Link
            href="/"
            className="w-32 h-7 hover:bg-slate-200/20 text-white rounded-md flex justify-center items-center"
          >
            Inicio
          </Link>
          <Link
            href="/login"
            className="w-32 h-7 hover:bg-slate-200/20 text-white rounded-md flex justify-center items-center"
          >
            Ingresar
          </Link>
          <Link
            href="/register"
            className="w-32 h-7 hover:bg-slate-200/20 text-white rounded-md flex justify-center items-center"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
