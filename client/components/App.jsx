import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import MovieApp from './MovieApp.jsx';
import SearchMovie from './SearchMovie.jsx';
import DisplayFav from './DisplayFav.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return(
            <MuiThemeProvider>
            <Router>
                <div>
                    <Route exact path= '/' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route path='/movieapp' component={MovieApp}/>
                    <Route path='/movieapp/searchmovie' component={SearchMovie}/>
                    <Route path='/movieapp/displayfav' component={DisplayFav}/>
                </div>
            </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;