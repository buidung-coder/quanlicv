import { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component{
  render(){
    return (
          <div className = "header-control">
            <Search onSearch = {this.props.onSearch}/>
            <Sort onSort = {this.props.onSort} sortBy = {this.props.sortBy} sortValue = {this.props.sortValue}/>
          </div>  
    );
  }
  }

export default Control;
