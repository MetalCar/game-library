import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Game from '../../../shared/igdbModels/Game';
import Platform from '../../../shared/igdbModels/Platform';
import EyeIcon from '@mui/icons-material/Visibility';
import LibraryButton from '../LibraryButton/LibraryButton';
import WishlistButton from '../WishlistButton/WishlistButton';

type Props = {
  game: Game;
};

const GameCard = ({ game }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [coverLink, setCoverLink] = useState<string>();

  useEffect(() => {
    if (typeof game.cover !== 'number' && game.cover !== undefined) {
      setCoverLink('https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.png');
    } else {
      setCoverLink('https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png');
    }
    setLoading(false);
  }, [game]);

  const getChipForPlatformId = (platform: Partial<Platform>) => {
    return (
      <Chip
        sx={{ m: 1 }}
        key={platform.id}
        label={platform.name}
        size="small"
      />
    );
  };

  const getGameName = (game: Game) => {
    // for later use
    /*if (game.alternative_names && game.alternative_names.length > 0) {
            const germanName = game.alternative_names.find((alternativeName: AlternativeName) => alternativeName.comment?.includes('German'));
            if (germanName) {
                return germanName.name;
            }
        }*/

    return game.name;
  };

  return (
    <Grid
      item
      key={game.id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <CardMedia
              component="img"
              sx={{
                height: 350,
                objectFit: 'contain',
                objectPosition: 'center center',
              }}
              image={coverLink}
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2">
                {getGameName(game)}
              </Typography>
              {game.platforms !== undefined &&
                game.platforms.map((platform: number | Partial<Platform>, index: number) => (typeof platform !== 'number' ? getChipForPlatformId(platform) : <></>))}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <LibraryButton game={game} />

              <WishlistButton game={game} />

              <Button size="small">
                <EyeIcon />
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default GameCard;
