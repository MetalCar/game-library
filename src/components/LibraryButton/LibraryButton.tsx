import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CropSquareIcon from '@mui/icons-material/LibraryAdd';
import CheckIcon from '@mui/icons-material/LibraryAddCheck';
import Game from '../../../shared/igdbModels/Game';

type Props = {
  game: Game;
};

const LibraryButton = ({ game }: Props) => {
  const [isOwned, setIsOwned] = useState<boolean>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    checkIfOwned();
  }, []);

  const checkIfOwned = useCallback(() => {
    window.electron.getGame(game.id).then((response: any) => {
      if (response !== null) {
        setIsOwned(response.isInLibrary);
      } else {
        setIsOwned(false);
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
    if (isOwned) {
      window.electron.unOwnGame(game.id).then(() => {
        checkIfOwned();
      });
    } else {
      window.electron.ownGame(game.id).then(() => {
        checkIfOwned();
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
        {isOwned ? <CheckIcon /> : <CropSquareIcon />}
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
        <Typography sx={{ px: 2, py: 1 }}>{isOwned ? 'Owned' : 'Not owned'}</Typography>
      </Popover>
    </>
  );
};

export default LibraryButton;
