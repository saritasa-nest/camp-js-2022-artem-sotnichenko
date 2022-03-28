import { memo, VFC } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

interface Props {
  /** Film title. */
  readonly title?: string;

  /** Whether dialog is open. */
  readonly isOpen: boolean;

  /** Close handler. */
  readonly onClose: () => void;

  /** Confirm handler. */
  readonly onConfirm: () => void;
}

const FilmDeleteDialogComponent: VFC<Props> = ({
  title, isOpen, onClose, onConfirm,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Delete
      {' '}
      {title ?? 'film'}
      ?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        The film will be permanently deleted, are you sure?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button type="button" onClick={onClose}>No</Button>
      <Button type="button" onClick={onConfirm} autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export const FilmDeleteDialog = memo(FilmDeleteDialogComponent);
