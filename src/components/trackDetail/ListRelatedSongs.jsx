import React from "react";
import RelatedSongCart from "./RelatedSongCart";

const ListRelatedSongs = ({ tracks }) => {
   return (
      <section className="max-h-[265px]  overflow-y-auto">
         {tracks.map((track) => (
            <RelatedSongCart key={track.id} track={track} />
         ))}
      </section>
   );
};

export default ListRelatedSongs;
