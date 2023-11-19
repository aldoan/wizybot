import './App.css'
import Container from '@mui/material/Container'
import AdditionalInfoForm from './components/AdditionalInfoForm/AdditionalInfoForm'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import WizyBotLogo from './components/WizyBotLogo/WizyBotLogo';

function App() {
  return (
    <>
       <AppBar position="static" className='header'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <WizyBotLogo />
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <AdditionalInfoForm />
      </Container>
    </>
  )
}

export default App
