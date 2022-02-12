import React from 'react';
import { MentionsInput, Mention } from 'react-mentions'
import PropTypes from 'prop-types';
import defaultStyle from './default-style';

function MentionInput({ value, trigger, dataProvider, className, placeholder, onChange }) {
    const handleInputChange = (e, htmlNode, plainText, mentions) => {
        onChange(e.target.value, mentions);
    };

    return <MentionsInput 
        className={className} 
        value={value}
        style={defaultStyle}
        placeholder={placeholder}
        onChange={handleInputChange} 
    >
        <Mention
            trigger={trigger}
            data={dataProvider}
            markup="<a className='mentioned-item' href='/__id__'>__display__</a>"
        />
    </MentionsInput>
}

MentionInput.defaultProps = {
    trigger: '@',
    className: '',
    value: ''
};

MentionInput.propTypes = {
    value: PropTypes.string,
    trigger: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    dataProvider: PropTypes.func.isRequired,
    onChange: PropTypes.func
};

export default MentionInput;