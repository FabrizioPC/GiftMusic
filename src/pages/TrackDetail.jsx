import React, { useEffect, useState } from "react";
import ContainerMusic from "../components/layout/ContainerMusic";
import { Link, useParams } from "react-router-dom";

import { axiosMusic } from "../config/axios.config";
import ListRelatedSongs from "../components/trackDetail/ListRelatedSongs";

const TrackDetail = () => {
   const [track, setTrack] = useState(null);
   const { id } = useParams();
   console.log(track);
   useEffect(() => {
      axiosMusic
         .get(`/api/tracks/${id}`)
         .then(({ data }) => setTrack(data))
         .catch((err) => console.log(err));
   }, [id]);
   return (
      <ContainerMusic>
         <Link
            to={-1}
            className="mb-4 text-sm block hover:text-yellowBorder transition-colors"
         >
            {"<"} Atras
         </Link>
         <header className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div className="rounded-xl overflow-hidden  sm:w-full sm:aspect-square">
               <img
                  className="w-full h-full object-cover"
                  src={track?.album.images[1].url}
                  alt=""
               />
            </div>
            <section>
               <h2 className="text-xs font-semibold line-clamp-1">
                  {track?.name}
               </h2>
               <div className="flex gap-1 flex-wrap ">
                  {track?.artists.map((artist) => (
                     <Link
                        to={`/artists/${artist.id}`}
                        className="text-slate-300 text-xs font-light  hover:text-yellowBorder"
                        key={artist.id}
                     >
                        {artist.name}
                     </Link>
                  ))}
               </div>
               <ul>
                  <li className="font-light">
                     <span className="font-semibold">Disco: </span>
                     <span className="text-slate-300 text-xs font-light">
                        {track?.album.name}
                     </span>
                  </li>
                  <li className="font-light">
                     <span className="font-semibold">Año de salida: </span>
                     {track?.album.release_date}
                  </li>
               </ul>
            </section>
         </header>

         <section className="mt-4 ">
            <h3 className="text-xl mb-2  font-semibold">Recomendaciones</h3>
            <ListRelatedSongs tracks={track?.relatedSongs ?? []} />
         </section>
      </ContainerMusic>
   );
};

export default TrackDetail;
