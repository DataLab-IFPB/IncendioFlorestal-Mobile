import React from 'react';
import { Container, ContainerLabel, Label, Touchable } from "./styles";

const ButtonMenu = ({ children, onPress }) => {
    return(
        <Touchable onPress={onPress}>
            {children}
        </Touchable>
    );
}

export default ButtonMenu;