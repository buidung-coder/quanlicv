import { Component } from 'react';
import Taskitem from './Taskitem';


class Tasklist extends Component{
  constructor(props){
    super(props);
    this.state = {
      filtername : '',
      filterstatus : 0
    }
  }
  onChange = (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value
    this.props.onFilter(name === 'filtername' ? value : this.state.filtername, name === 'filterstatus' ? value : this.state.filterstatus)
    this.setState({
      [name] : value
    });
  }
  render(){
    let {tasks} = this.props; //Cách viết tương tự let tasks = this.props.tasks
    let {filtername, filterstatus} = this.state
    console.log(tasks);
    let eleTasks = tasks.map((task, index) =>{
      return <Taskitem
        key = {task.id} index = {index} task = {task}
        onUpdateStatus = {this.props.onUpdateStatus} onDelete = {this.props.onDelete} onUpdate = {this.props.onUpdate}/>
    })
    return (
      <table className = "table table-bordered table-sm">
        <thead>
          <tr>
            <th scope = "col">STT</th>
            <th scope = "col">Tên công việc</th>
            <th scope = "col">Trạng thái</th>
            <th scope = "col">Hành động</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <th scope = "row"></th>
            <td>
            <input type = "text" className = "form-control" id = "formGroupExampleInput"
            name = 'filtername' value = {filtername} onChange = {this.onChange}/>
            </td>
            <td>
            <select className = "form-select" name = 'filterstatus' value = {filterstatus} onChange = {this.onChange}>
              <option value  = {0}>Tất cả</option>
              <option value  = {1}>Ẩn</option>
              <option value = {2}>Chưa thực hiện</option>
              <option value = {3}>Đang thực hiện</option>
              <option value = {4}>Đã hoàn thành</option>
            </select>
            </td> 
          </tr>
          {eleTasks}
        </tbody>
      </table>
    );
  }
  }
 

export default Tasklist;
