import React, { useEffect, useState } from "react";
import ContainerMusic from "../components/layout/ContainerMusic";
import { SearchIcon } from "../components/shared/Icons";
import { axiosMusic } from "../config/axios.config";
import ListTracksDefault from "../components/shared/ListTracksDefault";

const Home = () => {
   const [tracksRecommendations, setTracksRecommendations] = useState([]);
   const [searchResults, setSearchResults] = useState([]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const query = e.target.homeQuerySearch.value;
      if (query === "") return setSearchResults([]);
      axiosMusic
         .get(`/api/tracks?limit=10&q=${query}`)
         .then(({ data }) => setSearchResults(data.tracks.items))
         .catch((err) => console.log(err));
   };
   const tracksToShow =
      searchResults.length === 0 ? tracksRecommendations : searchResults;

   useEffect(() => {
      axiosMusic
         .get(
            "/api/tracks/recommendations?seed_genres=brazil,disco,electronic,pop,reggaeton"
         )
         .then(({ data }) => setTracksRecommendations(data.tracks))
         .catch((err) => console.log(err));
   }, []);

   return (
      <ContainerMusic>
         <header className="text-lg">
            <form
               onSubmit={handleSubmit}
               className="bg-purple-dark p-2 rounded-md flex gap-2 items-center"
            >
               <button>
                  <SearchIcon />
               </button>
               <input
                  id="homeQuerySearch"
                  className="bg-transparent outline-none flex-1"
                  type="text"
                  size={10}
                  autoComplete="off"
                  placeholder="Buscar"
               />
               <select className="bg-transparent outline-none">
                  <option value="10">10</option>
               </select>
            </form>
         </header>
         <ListTracksDefault tracks={tracksToShow} />
      </ContainerMusic>
   );
};

export default Home;
