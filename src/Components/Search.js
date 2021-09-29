import { Component } from 'react';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      keyword : ""
    }
  }
  onChange = (event) =>{
    let target = event.target;
    let name  = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    })
  }
  onSearch = () =>{
    this.props.onSearch(this.state.keyword)
  }
  render(){
    let {keyword} = this.state;
    return (
            <div className = "col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <div className = "input-group">
                    <input type = "text" className = "form-control" placeholder = "Nhập nội dung tìm kiếm..."
                    name = "keyword" value = {keyword} onChange = {this.onChange}/>
                    <button className = "btn btn-outline-secondary" type = "button" onClick = {this.onSearch}>Tìm kiếm</button>
                </div>
            </div>
    );
  }
  }
 

export default Search;
