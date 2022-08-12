import React from "react";
import { TextField } from "@mui/material";


const TextFieldWrapper = (props) => {
    const { name, error, touched, message, inputRef, ...otherProps } = props;
    
    const configTextField = {
        name,
        ...otherProps,
        // fullWidth: true,
        variant: 'outlined'
    };

    if (error) {
        configTextField.error = true;
        configTextField.helperText = error;
    }
    if (message) {
        configTextField.error = true;
        configTextField.helperText = message;
    }

    return (
        <TextField 
        ref={inputRef}
        {...configTextField} />
    )
}

export default TextFieldWrapper;