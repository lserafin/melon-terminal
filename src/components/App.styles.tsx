import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

export const theme = {
  mainColors: {
    primary: 'rgb(255, 253, 244)',
    primaryDark: 'rgb(161, 147, 94)',
    secondary: 'rgb(249, 242, 219)',
    secondaryDark: 'rgb(195, 179, 121)',
    border: 'rgb(234, 229, 212)',
  },

  statusColors: {
    primaryProfit: 'rgb(141, 197, 103)',
    secondaryProfit: 'rgb(243, 249, 241)',
    primaryLoss: 'rgb(206, 88, 102)',
    secondaryLoss: 'rgb(252, 240, 242)',
    warning: 'rgb(249,209,118)',
  },

  otherColors: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    grey: 'rgb(155, 155, 155)',
  },

  spaceUnits: {
    xxxs: '2px',
    xxs: '4px',
    xs: '8px',
    s: '12px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '40px',
  },

  fontFamilies: {
    primary: '"Source Serif Pro", serif',
  },

  fontSizes: { xxl: '1.25rem', xl: '1.125rem', l: '1rem', m: '0.875rem', s: '0.75rem', xs: '0.625rem', xxs: '0.55rem' },

  fontWeights: {
    light: '300',
    regular: '400',
    semiBold: '600',
    bold: '700',
  },

  mediaQueries: {
    l: 'min-width: 1024px',
    m: 'min-width: 768px',
    s: 'min-width: 480px',
  },
};

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
  }
  
  body {
    position: relative;
    font-family: 'Source Serif Pro', serif;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    min-height: 100%;
    background-color: ${theme.mainColors.primary};
  }
  

  h2 {
    font-size: ${theme.fontSizes.l};
    position: relative;
  }
  
  h2::after {
    content: ' ';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  h1, h3 {
    font-size: ${theme.fontSizes.xl};
    font-weight: bold;
    position: relative;
  }
  
  h3::after,
  h1::after {
    content: ' ';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  h4 {
    font-size: ${theme.fontSizes.l};
    margin-bottom: ${theme.spaceUnits.xs};
  }
  
  a {
    text-decoration-style: dotted;
    color: ${theme.otherColors.black};
  }
  
  hr {
    border: 0;
    height: 0;
    border-top: 1px solid ${theme.mainColors.border}
    margin: ${theme.spaceUnits.s} 0;
  }
`;

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <Reset />
      <Global />
      {children}
    </>
  </ThemeProvider>
);
