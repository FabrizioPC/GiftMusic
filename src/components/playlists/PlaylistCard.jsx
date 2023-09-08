import React from "react";
import { PencilEditIcon } from "../shared/Icons";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist, index }) => {
   const topDistance = index * 54;
   return (
      <Link
         to={`/playlists/${playlist.id}`}
         className="absolute front transition-transform hover:rotate-2 hover:-translate-y-4 cursor-pointer"
         style={{ top: `${topDistance}px` }}
      >
         <img className="mx-auto" src="/images/cassette.png" alt="" />
         <div className="flex items-center gap-2 bg-white absolute top-[18px] left-5 rounded-md px-2 w-[198px]">
            <h3 className="text-black flex-1 line-clamp-1">{playlist.title}</h3>
            <PencilEditIcon />
         </div>
      </Link>
   );
};

export default PlaylistCard;
