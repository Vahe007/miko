import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const MainDialog = (props) => {
    const {title, content, onConfirm, onClose, disabled, deleteId} = props;

    return (
        <>
            <Dialog
                open
                sx={{
                    paddingTop: '10px',
                }}
                onClose={onClose}
            >

                {/* <DialogTitle sx={{color: '#1976d2'}}
                >
                    {content}
                </DialogTitle> */}

                <DialogContent sx={{color: '#1976d2'}}>
                    {content}
                </DialogContent>

                <DialogActions sx={{margin: '0 auto'}}>
                    <Button sx={{color: 'black'}} onClick={onConfirm} disabled={disabled || false}>Yes</Button>
                    <Button sx={{color: 'black'}} onClick={onClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    )
}

export default MainDialog