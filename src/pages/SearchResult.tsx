import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Game from '../../shared/igdbModels/Game';
import GameCard from '../components/GameCard/GameCard';
import { useSearchParams } from 'react-router-dom';

const SearchResult = () => {
  const queryParams = useSearchParams();
  const searchTerm = queryParams[0].get('q');
  const [items, setItems] = useState<Game[]>([]);

  useEffect(() => {
    window.search.searchGame(searchTerm ?? '').then((response) => {
      setItems(response);
    });
  }, [searchTerm]);

  return (
    <Grid
      container
      spacing={4}>
      {items.map((game: Game, index: number) => (
        <GameCard
          key={index}
          game={game}
        />
      ))}
    </Grid>
  );
};

export default SearchResult;
