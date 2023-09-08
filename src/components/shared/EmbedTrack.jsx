import React from "react";

const EmbedTrack = ({ trackID }) => {
   return (
      <div className="my-4">
         <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${trackID}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
         ></iframe>
      </div>
   );
};

export default EmbedTrack;
