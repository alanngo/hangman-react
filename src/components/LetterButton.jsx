import { Button } from "@mui/material"

const LetterButton = ({ onClick, letter, disabled = false }) =>
(
    <Button
        variant="contained"
        onClick={onClick} 
        disabled ={disabled}>
        {letter}
    </Button>
)
export default LetterButton