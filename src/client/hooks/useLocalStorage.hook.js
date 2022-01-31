import { useState } from "react";

export default function useLocalStorage(key, initValue) {
    if (!key) throw new Error('Must provide a key.');

    const [value, setValue] = useState(() => {
        try {
            if (initValue) {
                const stringifiedValue = JSON.stringify(initValue);
                localStorage.setItem(key, stringifiedValue);
                return initValue;
            } else {
                const retrievedValue = localStorage.getItem(key);
                return retrievedValue ? JSON.parse(retrievedValue) : '';
            }
        } catch(err) {
            console.error(err);
            return '';
        }
    });

    return [
        value, 
        value => {
            try {
                if (value) {
                    const stringifiedValue = JSON.stringify(value);
                    localStorage.setItem(key, stringifiedValue);
                    setValue(value);
                } else {
                    localStorage.setItem(key, '');
                    setValue('');
                }
            } catch(err) {
                console.error(err);
            }
        },
        () => {
            localStorage.removeItem(key);
            setValue(null);
        }
    ];
}