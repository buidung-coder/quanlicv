import { Component } from 'react';
import './Sort.css';
import Modalsort from './Modalsort';

class Sort extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDisplayModal : false,
        }
    }
    toggleForm = () => {
        if(this.state.isDisplayModal){
          this.setState({
            isDisplayModal : true,
          })
        }else{
          this.setState({
             // Nếu trạng thái form là true thì khi xảy ra hành động sẽ là false
             isDisplayModal : !this.state.isDisplayModal,
          });
        }
    }
    onCloseModal = () => {
        this.setState({
          isDisplayModal : false
        })
      }
  render(){
    let {isDisplayModal} = this.state;
    let eleDisplayModal = isDisplayModal ? <Modalsort onSort = {this.props.onSort} sortBy = {this.props.sortBy} sortValue = {this.props.sortValue}/> : ''
    return (
        <div classname = "col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="btn-sort">
            <button type = "button" className = "btn btn-primary sort" onMouseEnter  = {this.toggleForm} onClick = {this.onCloseModal}>
                Sắp xếp
            </button>
            </div>
            <div onClick = {this.onCloseModal}>
                {eleDisplayModal}
            </div>
        </div>
    );
  }
  }
export default Sort;
