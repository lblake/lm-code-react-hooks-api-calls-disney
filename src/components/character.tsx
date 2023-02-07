import { useContext } from 'react';
import React from 'react';
import { FavouritesContext, UpdateFavouritesContext } from '../App';
import { DisneyCharacter } from '../disney_character';

interface CharacterProps {
  character: DisneyCharacter;
}

// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character: React.FC<CharacterProps> = ({ character }) => {
  const characterFavourites = useContext(FavouritesContext);
  const updateFavourites = useContext(UpdateFavouritesContext);

  let imageSrc = 'https://picsum.photos/300/200/?blur';
  if (character.imageUrl) {
    if (imageSrc.includes('/revision')) {
      imageSrc = character.imageUrl.substring(
        0,
        character.imageUrl.indexOf('/revision')
      );
    } else {
      imageSrc = character.imageUrl;
    }
  }

  const toggleFavouriteForCharacter = (character: DisneyCharacter) => {
    if (
      characterFavourites.filter((char) => char._id === character._id)
        .length === 0
    ) {
      updateFavourites([...characterFavourites, character]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (favChar) => favChar._id !== character._id
      );
      updateFavourites(updatedFavourites);
    }
  };

  return (
    <article className='character-item'>
      <h2>{character.name}</h2>

      <div
        className='character-item__actions'
        onClick={() => toggleFavouriteForCharacter(character)}
      >
        {characterFavourites.filter((char) => char._id === character._id)
          .length === 0
          ? 'Add to Favourites'
          : 'Favourited'}
      </div>

      <img
        className='character-item__img'
        src={imageSrc}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
