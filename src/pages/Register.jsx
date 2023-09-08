import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerAuth from "../components/layout/ContainerAuth";

import { axiosMusic } from "../config/axios.config";

const Register = () => {
   const navigate = useNavigate();
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));

      axiosMusic
         .post("/api/auth/register", data)
         .then(() => {
            alert("Usuario creado correctamente ahora inicia sesión");
            navigate("/auth/login");
         })
         .catch((err) => console.log(err));
   };
   return (
      <ContainerAuth>
         <header className="hidden sm:block sm:max-w-[350px]">
            <img src="/images/register-header.png" alt="" />
         </header>

         <form
            onSubmit={handleSubmit}
            className="grid gap-4 w-[min(100%,_350px)] sm:w-[300px]"
         >
            <h2 className="uppercase font-semibold text-3xl">Cuenta nueva</h2>
            <div className="grid gap-4">
               <label className="text-white/50 " htmlFor="email">
                  E-mail
               </label>
               <input
                  className="bg-transparent outline-none border-b border-yellowBorder p-1"
                  id="email"
                  type="email"
                  name="email"
               />
            </div>
            <div className="grid gap-4">
               <label className="text-white/50 " htmlFor="name">
                  Nombre de usuario
               </label>
               <input
                  className="bg-transparent outline-none border-b border-yellowBorder p-1"
                  id="name"
                  type="text"
                  name="name"
               />
            </div>
            <div className="grid gap-4">
               <label className="text-white/50 " htmlFor="password">
                  Contraseña
               </label>
               <input
                  className="bg-transparent outline-none border-b border-yellowBorder p-1"
                  id="password"
                  type="password"
                  name="password"
               />
            </div>
            <button className="bg-purple-light uppercase font-semibold text-sm max-w-max mx-auto px-6 py-1 rounded-full">
               Crear
            </button>
            <Link className="text-center  underline" to="/auth/login">
               O iniciar sesión
            </Link>
         </form>
      </ContainerAuth>
   );
};

export default Register;
