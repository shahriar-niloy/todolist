import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover as ReactPopover, PopoverBody } from 'react-bootstrap';

function Popover({ children, component: Component, placement, className, extendedClassName }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);

    return <>
        <span ref={ref} onClick={() => setShow(!show)} >{children}</span>
        <Overlay target={ref.current} show={show} placement={placement} rootClose={true} onHide={() => setShow(false)} >
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
    extendedClassName: ''
}

Popover.propTypes = {
    placement: PropTypes.string
}

export default Popover;