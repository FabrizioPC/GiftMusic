import React from "react";
import { Link } from "react-router-dom";

const PublicLayout = ({ children }) => {
   return (
      <section className="min-h-screen font-urbanist bg-purble-bg text-white bg-[url(/images/bg-auth-mobile.png)] sm:bg-[url(/images/bg-auth-desktop.png)] bg-right-bottom bg-no-repeat overflow-hidden">
         <header className="bg-purple-dark relative flex p-2 py-3 justify-center items-center sm:text-lg">
            <Link to="/">
               <h1 className="uppercase font-semibold">Gift Music</h1>
            </Link>
         </header>
         <section className="flex justify-center items-center pt-10 px-4">
            {children}
         </section>
      </section>
   );
};

export default PublicLayout;
