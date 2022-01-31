import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover as ReactPopover, PopoverBody } from 'react-bootstrap';

function Popover({ isOpen, children, component: Component, placement, className, extendedClassName, disabled, onShow }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);

    return <>
        <span ref={ref} onClick={() => setShow(!show)} className={disabled ? 'click-disabled' : ''}>{children}</span>
        <Overlay target={ref.current} show={isOpen || show} placement={placement} rootClose={true} onHide={() => setShow(false)} onEnter={onShow} >
            {
                props => <ReactPopover 
                        {...props}
                        arrowProps={{ ref: null, style: { display: 'none' } }}
                        className={`${className} ${extendedClassName}`}
                    >
                    <PopoverBody className="popover-body">
                        <Component hidePopover={() => setShow(false)} />
                    </PopoverBody>
                </ReactPopover>
            }
        </Overlay>
    </>
}

Popover.defaultProps = {
    placement: 'bottom',
    className: 'popover-default',
    extendedClassName: '',
    disabled: false,
    isOpen: false
}

Popover.propTypes = {
    placement: PropTypes.string,
    isOpen: PropTypes.bool,
    onShow: PropTypes.func
}

export default Popover;