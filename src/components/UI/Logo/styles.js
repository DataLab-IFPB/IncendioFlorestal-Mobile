import styled from 'styled-components';

export const Container = styled.View`
    margin: 10px;
`;

export const ImageLogo = styled.Image`
    width: ${({dimension}) => dimension + 'px'};
    height: ${({dimension}) => dimension + 'px'}
`;