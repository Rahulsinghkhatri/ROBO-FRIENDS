import React, { Component } from 'react';
import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { Connect, connect } from 'react-redux';
import { setSearchField } from '../actions';

const mapStateToProps = state =>{
  return{
    searchField : state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange:(event) => dispatch(setSearchField(event.target.Value))
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = {
      robots : [],
      // searchField : ''
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

    const {robots} = this.state;
    const {searchField,onSearchChange} = this.props;
    const filteredRobots = this.state.robots.filter(robots => {
      return robots.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase());
    })

    return !robots.length ?
          <h1>Loading</h1> :
          (
             <div className='tc'>
              <h1>RoboFriends</h1>
              <SearchBox searchchange={this.onSearchChange}/>
              <Scroll>
                <ErrorBoundary>
                   <CardList robots={filteredRobots}/>
                </ErrorBoundary> 
              </Scroll>
            </div>
       );
   }
  }

export default connect(mapStateToProps,mapDispatchToProps)(App);

