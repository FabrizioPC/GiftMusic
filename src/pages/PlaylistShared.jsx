import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../components/layout/PublicLayout";
import ContainerMusic from "../components/layout/ContainerMusic";
import { axiosMusic } from "../config/axios.config";
import { useParams } from "react-router-dom";
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail";
import {
   PlusSharedIcon,
   SharedIcon,
   SwitchIcon,
} from "../components/shared/Icons";
import EmbedTrack from "../components/shared/EmbedTrack";

const PlaylistShared = () => {
   const [playlistInfo, setPlaylistInfo] = useState(null);
   const [isShowSideA, setIsShowSideA] = useState(true);
   const [currentTrack, setCurrentTrack] = useState(null);
   const { id } = useParams();
   const formRef = useRef(null);
   const handleCopyUrl = () => {
      const actualUrl = window.location.href;
      navigator.clipboard
         .writeText(actualUrl)
         .then(() => alert("Copiado al portapapeles"));
   };
   useEffect(() => {
      axiosMusic
         .get(`/api/playlists/${id}`)
         .then(({ data }) => setPlaylistInfo(data))
         .catch((err) => console.log(err));
   }, []);
   useEffect(() => {
      if (playlistInfo) {
         formRef.current.playlistDetail_title.value = playlistInfo.title;
         formRef.current.playlistDetail_to.value = playlistInfo.to;
         formRef.current.playlistDetail_message.value = playlistInfo.message;
      }
   }, [playlistInfo]);
   return (
      <PublicLayout>
         <ContainerMusic>
            <form
               ref={formRef}
               id="formPlaylistCard"
               className={`relative w-[238px] mx-auto card ${
                  isShowSideA ? "sideA" : "sideB"
               }`}
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
                        id="playlistDetail_title"
                        required
                        disabled
                     />
                  </div>
                  <section className="flex justify-end gap-2 absolute left-5 right-5 bottom-4 ">
                     <button
                        type="button"
                        className="group border-2 rounded-full hover:border-yellowBorder transition-colors p-[5px]"
                     >
                        <PlusSharedIcon />
                     </button>
                     <button
                        onClick={handleCopyUrl}
                        type="button"
                        className="group border-2 rounded-full hover:border-yellowBorder transition-colors p-[4px]"
                     >
                        <SharedIcon />
                     </button>
                  </section>
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
                        id="playlistDetail_to"
                        required
                        disabled
                     />
                  </div>
                  <div className="flex items-center gap-2 bg-white absolute top-12 left-5 rounded-md px-2 w-[195px]">
                     <textarea
                        className="text-black text-sm bg-transparent outline-none p-1 flex-1 resize-none"
                        rows={4}
                        type="text"
                        placeholder="Dedicatoria"
                        size={10}
                        name="message"
                        id="playlistDetail_message"
                        required
                        disabled
                     />
                  </div>
               </div>
            </form>

            <button
               onClick={() => setIsShowSideA(!isShowSideA)}
               className="flex border border-white px-4 py-1 mt-2 rounded-full max-w-max mx-auto  my-4 hover:bg-purple-light"
            >
               <span className="mr-2 text-sm">
                  {isShowSideA ? "Lado A" : "Lado B"}
               </span>
               <SwitchIcon />
            </button>
            {currentTrack && <EmbedTrack trackID={currentTrack} />}

            <ListPlaylistDetail
               setCurrentTrack={setCurrentTrack}
               tracks={playlistInfo?.tracks ?? []}
               showPlayBtn
            />
         </ContainerMusic>
      </PublicLayout>
   );
};

export default PlaylistShared;
