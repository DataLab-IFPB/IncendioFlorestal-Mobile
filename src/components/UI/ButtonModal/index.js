import React from 'react';
import { Label, Touchable } from "./styles";

const ButtonModal = ({ children, onPress, highlighted = false }) => {
    return(
        <Touchable onPress={onPress} isHighlighted={highlighted}>
            <Label>{children}</Label>
        </Touchable>
    );
}
export default ButtonModal;