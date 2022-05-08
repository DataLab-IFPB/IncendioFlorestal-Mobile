import React from 'react';
import { ThemeProvider } from 'styled-components';

const configTheme = {
    text: {
        primary: '#FFF',
        secondary: '#67686A'
    },

    main: {
        primary: '#C00000',
        secondary: '#000000'
    },

    colors: {
        primary:   '#C00000',
        secondary: '#EAEAEA',
        label:     '#67686A',
        invalid:   '#C00000'
    }
}

const Theme = ({ children }) => {
    return(
        <ThemeProvider theme={configTheme}>
            {children}
        </ThemeProvider>
    );
}

export default Theme;