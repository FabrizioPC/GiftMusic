import React from "react";
import { usePlaylistCart } from "../../store/playlistCart";
import { PlusAddIcon } from "../shared/Icons";
import { Link } from "react-router-dom";

const RelatedSongCart = ({ track }) => {
   const addTrack = usePlaylistCart((store) => store.addTrack);
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
            <button onClick={() => addTrack(track)} className="group">
               <PlusAddIcon />
            </button>
         </section>
      </article>
   );
};
export default RelatedSongCart;
