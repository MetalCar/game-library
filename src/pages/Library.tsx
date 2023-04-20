import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import GameCard from '../components/GameCard/GameCard';
import Game from '../../shared/igdbModels/Game';

const Library = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    window.electron.getOwnedGames().then((response: any[]) => {
      const gameIds = response.map((item) => item.gameId);
      console.log(gameIds);
      window.electron.getGamesByIds(gameIds).then((response: Game[]) => {
        setGames(response);
      });
    });
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 'bold' }}>
        Library
      </Typography>
      <Grid
        container
        spacing={4}>
        {games.map((game: Game, index: number) => (
          <GameCard
            key={index}
            game={game}
          />
        ))}
      </Grid>
    </>
  );
};

export default Library;
