import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const customTheme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#378fed",
      500: "#3182CE",
    },
  },
  // styles: {
  //   global: {
  //     form: {
  //       backgroundColor: "white"
  //     }
  //   }
  // }
});

export default customTheme;
