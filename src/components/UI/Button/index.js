import React from 'react';
import { Touchable, Label } from './styles';

const Button = ({ children, onPress }) => {
    return(
        <Touchable onPress={onPress}>
            <Label>{children}</Label>
        </Touchable>
    );
}

export default Button;