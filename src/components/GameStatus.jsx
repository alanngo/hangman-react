import { Alert } from "@mui/material"
import { GREEN, RED } from "../helper/constants"
import RenderIf from "./RenderIf"

const GameStatus = ({lose, win, word}) => 
(
    <>
        <RenderIf condition={lose}>
            <Alert severity={RED}>GAME OVER! The word was: {word} 💀</Alert>
        </RenderIf>
        <RenderIf condition={win}>
            <Alert severity={GREEN}>Congratulations! 🎉</Alert>
        </RenderIf>
    </>
)
export default GameStatus