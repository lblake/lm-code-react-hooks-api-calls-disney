import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';

export const FavouritesContext = React.createContext<DisneyCharacter[]>([]);
export const UpdateFavouritesContext = React.createContext(
  (favourites: Array<DisneyCharacter>) => {}
);

const App: React.FC = () => {
  const baseURL = 'https://api.disneyapi.dev/';

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFavourites, setShowFavourites] = useState(false);


  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [characterFavourites, setCharacterFavourites] = useState<
    Array<DisneyCharacter>
  >([]);

  const getCharacters = async (pageNumber: number) => {
    try {
      const getResponse = await fetch(
        baseURL + `characters?page=${pageNumber}`
      );
      if (getResponse.ok) {
        const json = (await getResponse.json()) as {
          data: DisneyCharacter[];
        };
        setCharacters(json.data);
      }
    } catch (error) {
      console.log('error');
    }
  };
  const toggleFavouritesAll = () => {
    setShowFavourites((prev) => (prev === true ? false : true));
  };
  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <UpdateFavouritesContext.Provider value={setCharacterFavourites}>
        <div className="page">
          <Header currentPage={currentPage} showFavourites={showFavourites} />
          <Navigation
            currentPage={currentPage}
            showFavourites={showFavourites}
            setCurrentPage={setCurrentPage}
            toggleFavouritesAll={toggleFavouritesAll}
          />
          <CharacterContainer
            characters={showFavourites ? characterFavourites : characters}
          />
        </div>
      </UpdateFavouritesContext.Provider>
    </FavouritesContext.Provider>
  );
};

export default App;
