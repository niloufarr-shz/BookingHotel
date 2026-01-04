import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "../ui/ButtonIcon"
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <IoMoon/> :<IoMdSunny/>}
            
        </ButtonIcon>
    )
}

export default DarkModeToggle
