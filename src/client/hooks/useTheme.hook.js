import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage.hook";
import { THEME_LOCAL_STORAGE_KEY } from "../constants/theme.constants";
import appConstants from "../constants/app.constants";

export default function useTheme(dependencies) {
    const [currentTheme] = useLocalStorage(THEME_LOCAL_STORAGE_KEY, appConstants.DEFAULT_APPLICATION_THEME);
    
    const loadCurrentTheme = () => {
        document.querySelector('body').classList.add(currentTheme);
    };

    useEffect(loadCurrentTheme, dependencies);
}