import { BLANK, HIDDEN_CHAR } from "./constants"
export const eqIgnoreCase = (arg0 = BLANK, arg1 = BLANK) => (arg0.toLowerCase() === arg1.toLowerCase())
export const includesIgnoreCase = (word = BLANK, letter = BLANK) => (word.toLowerCase().includes(letter.toLowerCase()))
export const encrypt = (word = BLANK) => (word.replace(/[a-z]/g, HIDDEN_CHAR))
export const decrypt = (word = BLANK, display = BLANK, char = BLANK) => {
    const wordArr = word.split(BLANK)
    const displayArr = display.split(BLANK)
    for (let i = 0; i < wordArr.length; i++) 
        if (eqIgnoreCase(wordArr[i], char)) displayArr[i] = char
    
    return displayArr.join(BLANK)

}

