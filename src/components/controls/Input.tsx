import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info';

export default function Input(props) {
    const {name, label, value, error=null, minRows, maxRows, multiline, tooltip,handleChange} = props

    return (
        <>
            <TextField 
                name={name} 
                label={label}
                variant="outlined" 
                fullWidth={true}
                value={value}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
                onChange={handleChange}
                InputProps={ tooltip ? {
                    endAdornment: (
                    <InputAdornment position="start">
                        <Tooltip title="Store policies like shipping, refunds, etc.">
                        <InfoIcon />
                        </Tooltip>
                    </InputAdornment>
                    )
                }: {} }
                {...(error && {error:true, helperText:error})}
            />
        </>
    )
}