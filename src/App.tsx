import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';

const App: React.FC = () => {
  const baseURL = 'https://api.disneyapi.dev/';

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

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

  return (
    <div className='page'>
      <Header currentPage={currentPage} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
};

export default App;
