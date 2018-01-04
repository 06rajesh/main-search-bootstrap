/**
 * Created by Rajesh on 1/1/18.
 */

import React from 'react';
import Transition from 'react-transition-group/Transition';

export const Fade = ({ children, ...props }) => {
    const duration = props.duration ? props.duration : 300;
    const delay = props.delay ? props.delay : 0;
    return (
        <Transition in={props.in} timeout={duration}>
            {(state) => (
                <div style={{
                    ...props.style,
                    ...{transition: `opacity ${duration}ms ease-in-out ${delay}ms`},
                    ...Fade.DefaultStyle,
                    ...Fade.TransitionStyles[state]
                }}>
                    {children}
                </div>
            )}
        </Transition>
    );
};

Fade.DefaultStyle = {
    opacity: 0,
};

Fade.TransitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting: { opacity: 0.75},
    exit: { opacity: 0 }
};