import React from "react";

const ContainerAuth = ({ children }) => {
   return (
      <main className="font-urbanist min-h-screen bg-purble-bg text-white grid justify-stretch justify-items-center items-center bg-[url(/images/bg-auth-mobile.png)] gap-12 bg-right-bottom bg-no-repeat p-4 sm:grid-cols-[auto_auto] sm:justify-center sm:bg-[url(/images/bg-auth-desktop.png)] ">
         {children}
      </main>
   );
};

export default ContainerAuth;
