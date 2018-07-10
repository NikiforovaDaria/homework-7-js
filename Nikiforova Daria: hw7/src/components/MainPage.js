import React, { Component } from 'react';

class MainPage extends Component{
    constructor() {
        super();
        this.state = {
            currentPage:1,
            pokemons: []
        } 
        
        this.loadPokemonList(1)
    } 
    loadPokemonList = (page=1)=>{  
        let that=this; 
        /*fetch('./db.json', { 
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
        var pokemons = jsondata.pokemons
        that.setState({pokemons: pokemons.slice((page-1)*10,(page-1)*10+10)});
        that.setState({currentPage: page});
        })
        .catch(alert);*/

        fetch('http://localhost:3004/pokemons?_start='+((page-1)*10)+'&_end=' +((page-1)*10+10), { 
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
        var pokemons = jsondata;
        that.setState({pokemons: pokemons});
        that.setState({currentPage: page});
        })
        .catch(alert);
    }

    catch = (id) =>{
        fetch('http://localhost:3004/pokemons/'+ id, { 
            headers: {
                "content-type": "application/json"
            },
            method: 'PATCH',
            body: JSON.stringify({caught: 1})
        })
        .then(function (response) {
            return response.json();
        })
    }
    render(){
        return(
            <div><h1>Главная</h1>
                <PageNavigator loadPage={this.loadPokemonList} currentPage={this.state.currentPage}/>
                <PokeList data={this.state.pokemons} catch={this.catch}/>
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
                        {this.caught ? <button onclick={()=>this.props.catch(0)}>no</button> : 
                        <button onClick={()=>this.props.catch(pokemon.id)}>Catch</button>}
                        
                    </div>
                )}
            </div> 
        )
    };
}

export default MainPage;
