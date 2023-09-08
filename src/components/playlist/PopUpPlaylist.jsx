import React, { useState } from "react";
import { PencilEditIcon, SwitchIcon } from "../shared/Icons";
import "./PopUpPlaylist.css";
import ListCartPlaylist from "./ListCartPlaylist";
import { usePlaylistCart } from "../../store/playlistCart";
import { axiosMusic } from "../../config/axios.config";
const PopUpPlaylist = ({ isShowCurrentPlaylist }) => {
   const [isShowSideA, setIsShowSideA] = useState(true);
   const tracks = usePlaylistCart((store) => store.tracks);
   const cleanTracks = usePlaylistCart((store) => store.cleanTracks);
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      data.tracks = tracks;

      axiosMusic
         .post("/api/playlists", data)
         .then(() => {
            e.target.reset();
            cleanTracks();
         })
         .catch((err) => console.log(err));
   };
   return (
      <article
         className={`absolute w-[271.6px] z-10 -bottom-4 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-y-yellowBorder transition-[right] ${
            isShowCurrentPlaylist ? "right-4 " : "-right-full"
         }`}
      >
         <form
            onSubmit={handleSubmit}
            id="formPlaylistCard"
            className={`relative card ${isShowSideA ? "sideA" : "sideB"}`}
         >
            {/*Parte Frontal Lado A */}
            <div className="relative front">
               <img className="mx-auto" src="/images/cassette.png" alt="" />
               <div className="flex items-center gap-2 bg-white absolute top-4 left-5 rounded-md px-2 w-[197px]">
                  <input
                     className="text-black text-sm bg-transparent outline-none p-1 flex-1"
                     type="text"
                     placeholder="Título"
                     size={10}
                     name="title"
                     required
                     onFocus={() => setIsShowSideA(true)}
                  />
                  <label htmlFor="">
                     <PencilEditIcon />
                  </label>
               </div>
            </div>
            {/*Parte trasera Lado B */}
            <div className="absolute top-0 left-[3px] back">
               <img className="mx-auto" src="/images/cassette.png" alt="" />
               <div className="flex items-center gap-2 bg-white absolute top-4 left-5 rounded-md px-2 w-[195px]">
                  <input
                     className="text-black text-sm bg-transparent outline-none p-1 flex-1"
                     type="text"
                     placeholder="Para:"
                     size={10}
                     name="to"
                     required
                     onFocus={() => setIsShowSideA(false)}
                  />
                  <label htmlFor="">
                     <PencilEditIcon />
                  </label>
               </div>
               <div className="flex items-center gap-2 bg-white absolute top-12 left-5 rounded-md px-2 w-[195px]">
                  <textarea
                     className="text-black text-sm bg-transparent outline-none p-1 flex-1 resize-none"
                     rows={4}
                     type="text"
                     placeholder="Dedicatoria"
                     size={10}
                     name="message"
                     required
                     onFocus={() => setIsShowSideA(false)}
                  />
               </div>
            </div>
         </form>
         <button
            onClick={() => setIsShowSideA(!isShowSideA)}
            className="flex gap-1 border font-light border-white px-2 py-1 rounded-full mx-auto  hover:bg-slate-300"
         >
            <span className="text-sm">
               {" "}
               {isShowSideA ? "Lado A" : "Lado B"}
            </span>
            <SwitchIcon />
         </button>
         <ListCartPlaylist tracks={tracks} />
         <button
            className="border px-6 py-1 mx-auto border-white rounded-full  hover:bg-slate-300"
            form="formPlaylistCard"
         >
            Crear
         </button>
      </article>
   );
};

export default PopUpPlaylist;
