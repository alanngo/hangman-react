import { Button, TextField } from "@mui/material"

const InputField = (
    {
        label,
        disabled,
        submitText,
        inputSize,
        ref,
        onChange = () => null,
        onReset = () => null,
        onSubmit = () => null
    }
) =>
(
    <>
        <br />
        <TextField
            id="outlined-basic"
            label={label}
            variant="standard"
            inputProps={{ maxLength: inputSize || 1 }}
            onChange={onChange}
            ref={ref} />
        <br />
        <Button variant="contained" disabled={disabled} onClick={onSubmit}>{submitText}</Button>
        <Button variant="contained" onClick={onReset} color="error">Reset</Button>
        <br />
    </>
)
export default InputField