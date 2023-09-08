import React, { useEffect, useRef, useState } from "react";
import ContainerMusic from "../components/layout/ContainerMusic";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
   DeleteTrashIcon,
   PencilEditIcon,
   SaveIcon,
   SharedIcon,
   SwitchIcon,
} from "../components/shared/Icons";
import { axiosMusic } from "../config/axios.config";
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail";

const PlaylistsDetail = () => {
   const [isShowSideA, setIsShowSideA] = useState(true);
   const [playlistInfo, setPlaylistInfo] = useState(null);

   const { id } = useParams();
   const formRef = useRef(null);
   const navigate = useNavigate();

   const handleDeleteTrackByPlaylist = (idTrackToDelete) => {
      axiosMusic
         .delete(`/api/playlists/${playlistInfo.id}/tracks/${idTrackToDelete}`)
         .then(() => {
            const newTracks = playlistInfo.tracks.filter(
               (track) => track.id !== idTrackToDelete
            );
            setPlaylistInfo({ ...playlistInfo, tracks: newTracks });
         })
         .catch((err) => console.log(err));
   };
   const handleDeletePlaylist = () => {
      axiosMusic
         .delete(`/api/playlists/${id}`)
         .then(() => navigate("/playlists"))
         .catch((err) => console.log(err));
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      axiosMusic
         .patch(`/api/playlists/${id}`, data)
         .then(() => alert("Playlist actualizada correctamente"))
         .catch((err) => console.log(err));
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
      <ContainerMusic>
         <Link to={-1}>{"<"} Atras</Link>

         <form
            onSubmit={handleSubmit}
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
                     onFocus={() => setIsShowSideA(true)}
                  />
                  <label htmlFor="">
                     <PencilEditIcon />
                  </label>
               </div>
               <section className="flex justify-between absolute left-5 right-5 bottom-4 ">
                  <div className="flex gap-2">
                     <button
                        type="submit"
                        className="group border-2 rounded-full hover:border-yellowBorder transition-colors p-[4px]"
                     >
                        <SaveIcon />
                     </button>
                     <button
                        type="button"
                        onClick={handleDeletePlaylist}
                        className="group border-2 rounded-full hover:border-yellowBorder transition-colors p-[4px]"
                     >
                        <DeleteTrashIcon />
                     </button>
                  </div>
                  <Link
                     to={`/playlists/public/${id}`}
                     target="_blank"
                     className="group border-2 rounded-full hover:border-yellowBorder transition-colors p-[4px]"
                  >
                     <SharedIcon />
                  </Link>
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
                     id="playlistDetail_message"
                     required
                     onFocus={() => setIsShowSideA(false)}
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
         <ListPlaylistDetail
            tracks={playlistInfo?.tracks ?? []}
            handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
            showDeleteBtn
         />
      </ContainerMusic>
   );
};

export default PlaylistsDetail;
