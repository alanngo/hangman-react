import { HIDDEN_CHAR } from "./constants"
export const eqIgnoreCase = (arg0="", arg1="") =>(arg0.toLowerCase()===arg1.toLowerCase())
export const includesIgnoreCase = (word="", letter="") => (word.toLowerCase().includes(letter.toLowerCase()))
export const encrypt = (word="") =>(word.replace(/[a-z]/g, HIDDEN_CHAR))
export const decrypt = (word ="", display="", char='') =>{
    const wordArr = word.split("")
    const displayArr = display.split("")
    for (let i =0; i<wordArr.length; i++)
    {
        if ( eqIgnoreCase(wordArr[i], char))
        displayArr[i] = char
    }
    return displayArr.join("")

}
export const updateState = (state, key, value) => ({ ...state, key, value })

