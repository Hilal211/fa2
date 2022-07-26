import React from "react";
import Webrouter from "./router";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
// import UserContext from "./context/user";
import eventEmitter from '@/plugins/eventEmitter'
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
// import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
// import { withStyles } from '@mui/material/styles';
// const styles = {
//   'input-label': {
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     width: '100%',
//     color: 'red'
//   },

//   'input': {
//     '&::placeholder': {
//       textOverflow: 'ellipsis !important',
//       color: 'blue'
//     }
//   }
// };
function App() {

  const [snackbar, setSnackbar] = useState(false);
  const [snkMsg, setSnkMsg] = useState("");
  const [loader, setLoader] = useState(false);

  eventEmitter.on('loading', (load) => {
    setLoader(load)
  })


  eventEmitter.on('snackbar', (msg) => {
    if (msg === undefined) {
      setSnkMsg('An error has occurred. Please try again later.')
    } else {
      setSnkMsg(msg)
    }
    setSnackbar(true);
  });
  function closeSnackBar() {
    setSnackbar(false);
  }




  const theme = createTheme({

    breakpoints: {
      values: {
        xs: 0,
        sm: 451,
        md: 768,
        lg: 1023,
        xl: 1281,
        xxl: 1441
      },
    },
    palette: {
      primary: {
        main: '#000'
      },
      secondary: {
        main: '#fff'
      }
    }
  });


  return (
    <ThemeProvider theme={theme}>
    <div className="App" >
      <Webrouter />
      <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              autoHideDuration={2000}
              onClose={(e) => { closeSnackBar() }}
              open={snackbar}
              message={snkMsg}
            />
            {loader && <div className="loader"><CircularProgress color="inherit" /></div>}
    </div>
    </ThemeProvider>
  );
}
export default App;