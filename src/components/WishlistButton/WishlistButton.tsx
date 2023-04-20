import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import WishlistIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/LibraryAddCheck';
import Game from '../../../shared/igdbModels/Game';

type Props = {
  game: Game;
};

const WishlistButton = ({ game }: Props) => {
  const [isOnWishlist, setIsOnWishlist] = useState<boolean>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    checkIfWishlisted();
  }, []);

  const checkIfWishlisted = useCallback(() => {
    window.electron.getGame(game.id).then((response: any) => {
      if (response !== null) {
        setIsOnWishlist(response.isOnWishlist);
      } else {
        setIsOnWishlist(false);
      }
    });
  }, [game]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = () => {
    if (isOnWishlist) {
      window.electron.unwishGame(game.id).then(() => {
        checkIfWishlisted();
      });
    } else {
      window.electron.wishGame(game.id).then(() => {
        checkIfWishlisted();
      });
    }
  };

  return (
    <>
      <Button
        size="small"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={() => handleClick()}>
        {isOnWishlist ? <CheckIcon /> : <WishlistIcon />}
      </Button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography sx={{ px: 2, py: 1 }}>{isOnWishlist ? 'Wished' : 'Not wished'}</Typography>
      </Popover>
    </>
  );
};

export default WishlistButton;
