import React from 'react';
import Modal from '../../modal';
import PropType from 'prop-types';
import SettingSidebarContainer from '../../../containers/app/settings/settings-sidebar.container';

function Settings({ show, children, onHide }) {
    return <Modal extendedClass="p-0" isOpen={show} onRequestClose={onHide} >
        <div className='d-flex setting-container'>
            <div>
                <SettingSidebarContainer />
            </div>
            <div className='p-4 w-100'>{children}</div>
        </div>
    </Modal>
}

Settings.propTypes = {
    show: PropType.bool,
    onHide: PropType.func
};

export default Settings;