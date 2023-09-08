import React from "react";
import TrackByPlaylistDetail from "./TrackByPlaylistDetail";

const ListPlaylistDetail = ({
   tracks,
   handleDeleteTrackByPlaylist,
   showPlayBtn,
   showDeleteBtn,
   setCurrentTrack,
}) => {
   return (
      <section className="grid gap-2">
         {tracks.map((track) => (
            <TrackByPlaylistDetail
               key={track.id}
               track={track}
               handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
               showPlayBtn={showPlayBtn}
               showDeleteBtn={showDeleteBtn}
               setCurrentTrack={setCurrentTrack}
            />
         ))}
      </section>
   );
};

export default ListPlaylistDetail;
