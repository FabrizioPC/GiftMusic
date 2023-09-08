import React from "react";
import { Link } from "react-router-dom";
import { MinusRemoveIcon } from "../shared/Icons";
import { usePlaylistCart } from "../../store/playlistCart";

const TrackPlaylistCart = ({ track }) => {
   const deleteTrack = usePlaylistCart((store) => store.deleteTrack);
   return (
      <article
         key={track.id}
         className="flex items-center gap-2 hover:bg-white/30 p-1 rounded-md pr-2 transition-colors"
      >
         <header className="rounded-md overflow-hidden w-[45px]">
            <img src={track.album.images[2].url} alt="" />
         </header>
         <section className="flex-1 text-sm sm:text-base">
            <Link
               to={`/tracks/${track.id}`}
               className="font-semibold line-clamp-1"
            >
               {track.name}
            </Link>
            <div className="flex gap-1 flex-wrap ">
               {track.artists.map((artist) => (
                  <Link
                     to={`/artists/${artist.id}`}
                     className="text-slate-300 text-xs font-light  hover:text-yellowBorder"
                     key={artist.id}
                  >
                     {artist.name}
                  </Link>
               ))}
            </div>
         </section>
         <section className="flex items-center gap-2">
            <button onClick={() => deleteTrack(track.id)} className="group">
               <MinusRemoveIcon />
            </button>
         </section>
      </article>
   );
};

export default TrackPlaylistCart;
