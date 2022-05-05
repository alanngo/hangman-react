import { Button } from "@mui/material"
import { BTN_VARIANT } from "../helper/constants"

const LetterButton = ({ onClick, letter, disabled }) =>
(
    <Button
        variant={BTN_VARIANT}
        onClick={onClick} 
        disabled ={disabled}>
        {letter}
    </Button>
)
export default LetterButton