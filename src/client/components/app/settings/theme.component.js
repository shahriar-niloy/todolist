import React from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../../../constants/theme.constants';

function Theme({ name, onThemeChange }) {
    return <div>
        <div className='fw-bold font-size-19'>Theme</div>
        <div className='fw-bold mt-4 mb-2'>Select a theme</div>
        <div className='theme-switcher'>
            <div className={`${THEMES.DARK === name ? 'theme-active' : ''} theme-switch`} onClick={() => onThemeChange(THEMES.DARK)}>
                <i class="far fa-moon"></i>
                <span>Dark</span>
            </div>
            <div className={`${THEMES.LIGHT === name ? 'theme-active' : ''} theme-switch`} onClick={() => onThemeChange(THEMES.LIGHT)}>
                <i class="far fa-sun"></i>
                <span>Light</span>
            </div>
        </div>
    </div>
}

Theme.propTypes = {
    name: PropTypes.string.isRequired,
    onThemeChange: PropTypes.func.isRequired
}

export default Theme;