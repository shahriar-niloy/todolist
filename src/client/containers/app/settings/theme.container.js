import React from 'react';
import Theme from '../../../components/app/settings/theme.component';
import useLocalStorage from '../../../hooks/useLocalStorage.hook';
import { THEME_LOCAL_STORAGE_KEY } from '../../../constants/theme.constants';

function ThemeContainer() {
    const [value, setValue] = useLocalStorage(THEME_LOCAL_STORAGE_KEY);

    const handleThemeChange = theme => {
        setValue(theme);
        const body = document.querySelector('body');
        body.classList.replace(value, theme);
    };

    return <Theme name={value} onThemeChange={handleThemeChange} />
}

export default ThemeContainer;