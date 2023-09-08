import React from "react";

import TrackPlaylistCart from "./TrackPlaylistCart";

const ListCartPlaylist = ({ tracks }) => {
   return (
      <section className="max-h-[265px]  overflow-y-auto">
         {tracks.map((track) => (
            <TrackPlaylistCart key={track.id} track={track} />
         ))}
      </section>
   );
};

export default ListCartPlaylist;
