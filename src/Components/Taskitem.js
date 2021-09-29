import { Component } from 'react';


class Taskitem extends Component{
  onUpdateStatus = () => {
    // Truyền ID của item đã click ra cho Tasklist 
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }
  render(){
    let {task, index} = this.props
    return (
        <tr>
        <th scope = "row">{index +1}</th>
        <td>{task.name}</td>
        <td className = 'text-center'>
          <span onClick = {this.onUpdateStatus}>
          {task.status === 2 ? 'Chưa thực hiện':
          task.status === 3 ? 'Đang thực hiện':
          task.status === 4 ? 'Đã hoàn thành': 'Ẩn'
           }
          </span>
        </td>
        <td className = 'action'>
        <button className = "btn btn-outline-secondary" type = "button" onClick = {this.onUpdate}>
            <i className = "fas fa-plus"></i>
            Sửa
        </button>
        <button className = "btn btn-outline-secondary" type = "button" onClick = {this.onDelete}>
            <i className = "fas fa-plus"></i>
            Xóa
        </button>
        </td>
        </tr>
    );
  }
  }
  export default Taskitem;

