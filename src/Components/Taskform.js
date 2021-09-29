import { Component } from 'react';


class Taskform extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name : '',
      status : 1,
      description :''
    }
  }
  componentDidMount(){
    if(this.props.tasksing){
      this.setState({
        id : this.props.tasksing.id,
        name : this.props.tasksing.name,
        status : this.props.tasksing.status

      })
    }
  }
  // Sử lí chức năng khi form mở sẵn vẫn có thể lựa chọn sửa
  componentWillReceiveProps(nextprops){
    if(nextprops && nextprops.tasksing){
      this.setState({
        id : nextprops.tasksing.id,
        name : nextprops.tasksing.name,
        status : nextprops.tasksing.status
      })
    }else if(!nextprops.tasksing){
      this.setState({
        id: '',
        name : '',
        status : 1,
        description :''
      })
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm()
  }
  onChange = (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name==='status'){
      this.setState({
        [name]:+value
    });
    }else{
      this.setState({
      [name] : value
    });
  }
  console.log(this.state);
  }
  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
    // Khi submit thì tự động reset lại form và đóng form
    this.onClear()
    this.onCloseForm()
  }
  onClear = () => {
    this.setState({
      name : '',
      status : 1 
    })
  }
  render(){
    let {id, status, name} = this.state;
    status = parseInt(status, 10)
    console.log(typeof status,status);
    return (
          <form onSubmit = {this.onSubmit}>
              <h3 className = 'form-heading'>
                {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                <i className = "fas fa-times" onClick = {this.onCloseForm}></i>
              </h3>
              <div className = "mb-3">
                <label className = "form-label">
                  Tên công việc
                </label>
                <input
                  type = "text"
                  className = "form-control"
                  name = 'name'
                  value = {name}
                  onChange={this.onChange}/>
              </div>
              <select
                className = "form-select"
                name = 'status'
                value = {status}
                onChange={this.onChange}>
                <option selected value = {1}>Ẩn</option>
                <option value = {2}>Chưa thực hiện</option>
                <option value = {3}>Đang thực hiện</option>
                <option value = {4}>Đã hoàn thành</option>
              </select>
              <div className = "mb-3">
                <div className = "form-check">
                  <input className = "form-check-input" type = "checkbox"/>
                  <label className = "form-check-label">
                    Can't check this
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Lưu lại</button>
              <button type="button" className="btn btn-cancel" onClick = {this.onClear}> Hủy bỏ </button>
          </form>
    );
  }
  }
 

export default Taskform;
