import React from "react";
import { CirclePlayIcon, PlusAddIcon } from "./Icons";
import { Link } from "react-router-dom";
import { usePlaylistCart } from "../../store/playlistCart";

const TrackDefaultCard = ({ track }) => {
   const addTrack = usePlaylistCart((store) => store.addTrack);
   return (
      <article className="flex items-center gap-2 hover:bg-white/30 p-1 rounded-md pr-2 transition-colors">
         <header className="rounded-md overflow-hidden">
            <img src={track.album.images[2].url} alt="" />
         </header>
         <section className="flex-1 text-sm sm:text-base">
            <Link
               to={`/tracks/${track.id}`}
               className="font-semibold line-clamp-1"
            >
               {track.name}
            </Link>
            <div className="flex gap-1 flex-wrap">
               {track.artists.map((artist) => (
                  <Link
                     to={`/artists/${artist.id}`}
                     className="text-slate-400 font-light transition-colors hover:text-yellowBorder"
                     key={artist.id}
                  >
                     {artist.name}
                  </Link>
               ))}
            </div>
         </section>
         <section className="flex items-center gap-2">
            <button className="group">
               <CirclePlayIcon />
            </button>
            <button onClick={() => addTrack(track)} className="group">
               <PlusAddIcon />
            </button>
         </section>
      </article>
   );
};

export default TrackDefaultCard;
