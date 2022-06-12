import styled from 'styled-components';

export const Modal = styled.Modal`
    flex: 1;
`;

export const ContainerRoot = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(53, 52, 53, 0.6);
`;

export const Container = styled.View`
    background-color: #FFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    elevation: 5;
`;

export const ContainerIcon = styled.View`
    position: absolute;
    top: -50px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: #FFF;
`;

export const ContainerContent = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 32px;
    margin: 5px;
`;

export const TextInfo = styled.Text`
    color: ${({theme}) => theme.colors.label};
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
`;