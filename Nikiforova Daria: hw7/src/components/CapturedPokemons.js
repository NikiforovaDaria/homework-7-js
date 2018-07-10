import React, { Component } from 'react';


class CapturedPokemons extends Component{
    constructor() {
        super();
        this.state = {
            currentPage:1,
            pokemons: []
        } 
        
        this.loadPokemonList(1)
    } 
    loadPokemonList = (page=1)=>{  
        let that=this; //есть баг
        fetch('http://localhost:3004/pokemons/?caught=1', { 
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
        var pokemons = jsondata
        that.setState({pokemons: pokemons.slice((page-1)*10,(page-1)*10+10)});
        that.setState({currentPage: page});
        })
        .catch(alert);
    }
    render(){
        return(
            <div>
                <PageNavigator loadPage={this.loadPokemonList} currentPage={this.state.currentPage}/>
                <h1>Пойманные покемоны:</h1><br />
                <PokeList data={this.state.pokemons}/>
            </div>
        )
    };
}
class PageNavigator extends Component{
    render(){
        return(
            <div>
                <b onClick={()=>this.props.loadPage(this.props.currentPage - 1)}> - </b>
                <b>{this.props.currentPage}</b>
                <b onClick={()=>this.props.loadPage(this.props.currentPage + 1)}> + </b>
            </div>
        )
    }
}

class PokeList extends Component {
    render () {
        return(
            <div>
                {this.props.data.map((pokemon, i) =>
                    <div class="pokemonsDiv">
                        <h3>{pokemon.id} {pokemon.name} </h3>
                        <img src= {`/pokemons/${pokemon.id}.png`} width = "50px" alt="pokemon"/>
                    </div>
                )}
            </div> 
        )
    };
}

export default CapturedPokemons;