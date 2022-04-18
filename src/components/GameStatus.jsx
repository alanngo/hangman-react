import { Alert } from "@mui/material"
import RenderIf from "./RenderIf"

const GameStatus = ({lose, win, word}) => 
(
    <>
        <RenderIf condition={lose}>
            <Alert severity="error">GAME OVER! The word was: {word} 💀</Alert>
        </RenderIf>
        <RenderIf condition={win}>
            <Alert severity="success">Congratulations! 🎉</Alert>
        </RenderIf>
    </>
)
export default GameStatus