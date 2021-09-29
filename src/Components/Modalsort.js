import React, { Component } from 'react'

export default class Modalsort extends Component {
    onClick = (sortBy, sortValue) =>{
        this.props.onSort(sortBy, sortValue)
    }
    render(){
    return (
        <div className="sort-menu">
            <ul classname = "dropdown-menu menu-sort" aria-labelledby = 'dropdownMenu1'>
                <li onClick = {() => this.onClick('name', 1)}>
                    <p role = "button" className = {(this.props.sortBy ==='name' && this.props.sortValue ===1) ? "sort_selected" : ''}>
                        <i class="fas fa-sort-alpha-up"></i>
                        Tên A-Z
                    </p>
                </li>
                <li onClick = {()=>this.onClick('name', -1)}>
                    <p role = "button" className = {(this.props.sortBy ==='name' && this.props.sortValue ===-1) ? "sort_selected" : ''}>
                        <i class="fas fa-sort-alpha-down"></i>
                        Tên Z-A
                    </p>
                </li>
                <li onClick = {()=>this.onClick('status', 1)}>
                    <p role = "button" className = {(this.props.sortBy ==='status' && this.props.sortValue ===1) ? "sort_selected" : ''}>
                        Ẩn
                    </p>
                </li>
                <li onClick = {()=>this.onClick('status', 2)}>
                    <p role = "button" className = {(this.props.sortBy ==='status' && this.props.sortValue ===2) ? "sort_selected" : ''}>
                        Chưa thực hiện
                    </p>
                </li>
                <li onClick = {()=>this.onClick('status', 3)}>
                    <p role = "button" className = {(this.props.sortBy ==='status' && this.props.sortValue ===3) ? "sort_selected" : ''}>
                        Đang thực hiện
                    </p>
                </li>
                <li onClick = {()=>this.onClick('status', 4)}>
                    <p role = "button" className = {(this.props.sortBy ==='status' && this.props.sortValue ===4) ? "sort_selected" : ''}>
                        Đã hoàn thành
                    </p>
                </li>
            </ul>
            </div>
    )
    }
}
