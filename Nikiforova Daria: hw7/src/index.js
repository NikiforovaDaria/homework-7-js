import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter , Route, Link, NavLink, Switch} from "react-router-dom";
import MainPage from "./components/MainPage";
import CapturedPokemons from "./components/CapturedPokemons";

const Menu = () =>(
    <header>
        <nav>
            <li><NavLink activeStyle={{color:'green'}} to='/'>Home</NavLink></li>
            <li><NavLink activeStyle={{color:'green'}} to='/my-pokemons'>My Pokemons</NavLink></li>
        </nav>
    </header>
)
ReactDOM.render( <BrowserRouter>
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component ={MainPage}/>
            <Route path="/my-pokemons" component={CapturedPokemons}/>
        </Switch>
    </div>  
    </BrowserRouter>, document.getElementById('root')
)

