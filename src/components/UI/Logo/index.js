import React from 'react';
import { Container, ImageLogo } from "./styles";

const Logo = ({ dimension }) =>  {
    return(
        <Container>
            <ImageLogo 
                dimension={dimension}
                source={require('../../../assets/logo.png')}
            />
        </Container>        
    );
}

export default Logo;