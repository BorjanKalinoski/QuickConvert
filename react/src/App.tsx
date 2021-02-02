import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import './styles/main.scss';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/contact' exact component={ContactPage}/>
                <Route path='/about' exact component={AboutPage}/>
                <Route path='/' render={() => <div>404</div>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
