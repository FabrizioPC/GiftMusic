import React, { useState } from "react";
import { LogoutIcon, MinimalPlayIcon, PlaylistIcon } from "../shared/Icons";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../store/userInfo";
import PopUpPlaylist from "../playlist/PopUpPlaylist";
import { usePlaylistCart } from "../../store/playlistCart";

const PrincipalLayout = ({ children }) => {
   const [isShowAuthOptions, setIsShowAuthOptions] = useState(false);
   const [isShowCurrentPlaylist, setIsShowCurrentPlaylist] = useState(false);
   const tracks = usePlaylistCart((store) => store.tracks);
   const cleanTracks = usePlaylistCart((store) => store.cleanTracks);
   const logout = useUserInfo((state) => state.logout);
   const handleClickLogout = () => {
      logout();
      cleanTracks();
   };
   return (
      <section className="min-h-screen font-urbanist bg-purble-bg text-white bg-[url(/images/bg-auth-mobile.png)] sm:bg-[url(/images/bg-auth-desktop.png)] bg-right-bottom bg-no-repeat overflow-hidden">
         <header className="bg-purple-dark relative flex p-2 justify-between items-center sm:text-lg">
            <Link to="/">
               <h1 className="uppercase font-semibold">Gift Music</h1>
            </Link>
            <section className="flex gap-2 [&>button]:uppercase [&>button]:border-[1px] [&>button]:py-1 [&>button]:px-2 [&>button]:text-sm [&>button]:font-semibold [&>button]:rounded-full [&>button]:border-yellowBorder ">
               <button
                  onClick={() => setIsShowAuthOptions(!isShowAuthOptions)}
                  className="hover:bg-purple-light "
               >
                  Mi cuenta
               </button>
               <button
                  onClick={() =>
                     setIsShowCurrentPlaylist(!isShowCurrentPlaylist)
                  }
                  className="flex gap-3 sm:gap-2 items-center hover:bg-purple-light "
               >
                  <PlaylistIcon />
                  <span className="hidden sm:inline">Grabando</span>{" "}
                  {tracks.length}
               </button>
            </section>
            {/* popup Auth */}
            <article
               className={`absolute -bottom-4 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-y-yellowBorder transition-[right] ${
                  isShowAuthOptions ? "right-4 " : "-right-full"
               }`}
            >
               <Link
                  to={"/playlists"}
                  className="flex gap-2 items-center uppercase font-semibold hover:text-yellowBorder group"
               >
                  <MinimalPlayIcon />
                  Mis grabaciones
               </Link>
               <button
                  onClick={handleClickLogout}
                  className="flex gap-2 items-center uppercase font-semibold hover:text-yellowBorder group"
               >
                  <LogoutIcon />
                  Cerrar sesión
               </button>
            </article>
            {/* popuo playlist */}
            <PopUpPlaylist isShowCurrentPlaylist={isShowCurrentPlaylist} />
         </header>
         <section className="flex justify-center items-center pt-10 px-4">
            {children}
         </section>
      </section>
   );
};

export default PrincipalLayout;
