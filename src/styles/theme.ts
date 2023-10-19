import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints, Styles } from "@chakra-ui/theme-tools";


const colors = {
    transparent: "transparent",
    textPrincipal: "#000",
    white: "#fff",
    princpale : "#00FF00",
    secondair:'RGBA(0, 0, 0, 0.92)',
    textSecondair: "RGBA(0, 0, 0, 0.48)"	

  }
  const breakpoints = createBreakpoints({
    sm: "37.5em", // 600px
    md: "56.25em", // 900px
    lg: "75em", // 1200px
    xl: "112.5em", // 1800px
  });
  const fonts = {
    body:  `'Nunito', sans-serif`,
  };
const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
}



const theme = extendTheme({
    fontSizes,
    colors,
    fonts,
    breakpoints
});

export default theme;