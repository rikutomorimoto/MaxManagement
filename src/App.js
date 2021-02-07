import {useState} from 'react'
import DrfApiFetch from './components/DrfApiFetch'
import Login from './components/login'
import {createMuiTheme} from '@material-ui/core/styles/'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'

const theme = createMuiTheme({
  palette:{
    primary: indigo,
    secondary: {
      main: '#f44336'
    },
    typography:{
      button:{
        textTransform: "none"
      },
      fontFamily:'Comic Neue'
    }
  }
})

const App = () =>{

  const [userInfo, setUserInfo] = useState({username:"", token:""})
  return (    
    <MuiThemeProvider theme={theme}>      
    <div className="App">
      <header className="App-header">      
        { userInfo.token ?< DrfApiFetch userInfo = {userInfo}/>
        :<Login setUserInfo = {setUserInfo}/>
        }                      
      </header>
    </div>
    </MuiThemeProvider>
    
  );
}

export default App;
