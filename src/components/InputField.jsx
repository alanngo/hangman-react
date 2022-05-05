import { Button, TextField } from "@mui/material"
import { RESET, BTN_VARIANT } from "../helper/constants"

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
            label={label}
            variant="standard"
            inputProps={{ maxLength: inputSize || 1 }}
            onChange={onChange}
            ref={ref} />
        <br />
        <Button variant={BTN_VARIANT} disabled={disabled} onClick={onSubmit} color="success">{submitText}</Button>
        <Button variant={BTN_VARIANT} onClick={onReset} color="error">{RESET}</Button>
        <br />
    </>
)
export default InputField