import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from "@mui/material/Button"

const Alert = ({ open, handleClose, title, subTitle }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {subTitle}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>好</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Alert