import React from 'react';
import {Dialog as DialogMessage, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';

export default function Dialog({displayDialog, handleClose, dialogTitle, dialogDescription, dialogButton}) {
  return (
    <div>
        <DialogMessage open={displayDialog} onClose={handleClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <p>{dialogDescription}</p>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='contained'>{dialogButton}</Button>
            </DialogActions>
        </DialogMessage>
    </div>
  )
}
