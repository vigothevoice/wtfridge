import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "2rem",
      paddingBottom: 30,
      textAlign: "center"
    },
    h2: {
      fontSize: "1.6rem",
      paddingBottom: 30,
      textAlign: "center"
    },
    h3: {
      fontSize: "1.3rem",
      paddingBottom: 30,
      textAlign: "center"
    },
    p: {
      fontSize: "0.8rem"
    },
    label: {
      fontSize: "0.8rem"
    }
  },
  palette: {
    primary: {
      light: "#98ee99",
      main: "#66bb6a",
      dark: "#338a3e",
      contrastText: "#424242"
    },
    secondary: {
      light: "#ffb04c",
      main: "#f57f17",
      dark: "#bc5100",
      contrastText: "#212121"
    }
  },
  overrides: {
      MuiFormControl: {
        root: {
          width: "100%",
          marginTop: 15
        }
      },
      MuiOutlinedInput: {
        root: {
          width: "100%"
        }
      },
      MuiBottomNavigation: {
        root: {
          height: "55px"
        }
      },
      MuiCardContent: {
        root: {
          paddingBottom: 0
        }
      }
    }
});

export default theme;
