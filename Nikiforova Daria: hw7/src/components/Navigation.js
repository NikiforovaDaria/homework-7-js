import React, { Component } from "react";
import { Route, NavLink } from ".react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/blog">Captured</NavLink></li>
                    </ul>
                </nav>
                <Route exact path="/" component={PokeList} />
                <Route path="/captured" component={Captured} />
            </div>
        );
    }
}

export default Navigation;