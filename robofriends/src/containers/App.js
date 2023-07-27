import React, { Component } from 'react';
import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';``
import Scroll from '../components/Scroll';

class App extends Component{
  constructor(){
    super();
    this.state = {
      robots : [],
      searchField : ''
    }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(Response =>Response.json())
    .then(users => {this.setState({robots:users})});
  }

  onSearchChange = (Event) =>{
    this.setState({searchField: Event.target.Value});
  }

  render() {

    const filteredRobots = this.state.robots.filter(robots => {
      return robots.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase());
    })

    if(this.state.robots.length ===0)
    {
      return<h1>Loading</h1>
    }
    else{
      return (
       <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchchange={this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots}/>
        </Scroll>
       </div>
    );
   }
  }
}

export default App

