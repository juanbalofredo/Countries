import { Route } from 'react-router-dom'
import LandingPage from './components/home/LandingPage';
import Home from './components/home/Home';
import NavBar from './components/home/NavBar';
import CountryDetail from './components/home/CountryDetail';
import Activity from './components/home/Activity';

function App() {
  return (
    <>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Route path='/home'>
        <NavBar />
      </Route>
      <Route path='/home' exact>
        <Home />
      </Route>
      <Route path='/country/:idPais' exact>
        <CountryDetail />
      </Route>
      <Route path="/activity" exact>
        <Activity />
      </Route>
    </>
  );
}

export default App;
