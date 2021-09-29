import { Component } from 'react';
import './App.css';
import Control from './Components/Control';
import Taskform from './Components/Taskform';
import Tasklist from './Components/Tasklist';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      tasksing : null ,
      // Ẩn form khi bắt đầu
      isDisplayForm : false,
      filter : {
        name : '',
        status : 0
      },
      keyword : '',
      sort : {
        sortBy : 'name',
        sortValue : 1
      }
      

    }
  }
  // Hàm  tắt mở form
  toggleForm = () => {
      if(this.state.isDisplayForm && this.state.tasksing){
        this.setState({
          isDisplayForm : true,
          tasksing : null
        })
      }else{
        this.setState({
           // Nếu trạng thái form là true thì khi xảy ra hành động sẽ là false
           isDisplayForm : !this.state.isDisplayForm,
           tasksing : null
        });
      }
  }
  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }
  // Tạo 1 chuỗi random
  s4(){
    return Math.floor((1+ Math.random())*0x10000).toString(16).substring(1);
  }
  // Tạo ID từ chuỗi random
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-'+ this.s4()
  }
  //Đóng form
  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    })
  }
  // Mở form
  onShowForm = () => {
    this.setState({
      isDisplayForm : true
    })
  }
  onSubmit = (data, status) =>{
    var {tasks} = this.state;
    status = parseInt (status, 10)
    if(data.id === ''){
      // Gán ID cho data
      data.id = this.generateID();
      // Thêm nội dung trong data vào tasks
      tasks.push(data);
    }else {
      let index = this.findIndex(data.id)
      tasks[index] = data
    }
    // Cập nhật lại nội dung trong task khi mới thêm 1 phần tử vào
    this.setState({
      tasks : tasks,
      tasksing : null
    });
    // Lưu dữ liệu vào local
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Nhận ID từ Tasklist truyền ra và xử lí sự kiện
  onUpdateStatus = (id) =>{
    let {tasks} = this.state
    // Khai báo biến index được gán giá trị là hàm findIndex(id) với tham số truyền vào là id
    let index = this.findIndex(id)
    // Nếu index khác -1 thì giá trị status tại tasks có vị trí index tăng thêm 1
    if(index !== -1){
      tasks[index].status += 1
      if(tasks[index].status >=5) {
        tasks[index].status = 1
      }
    }
    this.setState({
      tasks : tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  findIndex = (id) =>{
    // Khai báo biến tasks
    let {tasks} = this.state;
    let result = -1;
    // Lặp qua từng phần tử để lấy ra từng tasks và index
    tasks.forEach((tasks,index) => {
      if(tasks.id ===id){
        result = index
      }
    });
    return result
  }
  // Hàm xử lí sự kiện xóa 1 phần tử trong tasklist
  onDelete = (id) =>{
    let {tasks} = this.state
    let index = this.findIndex(id)
    if(index !== -1){
     tasks.splice(index, 1)
    }
    this.setState({
      tasks : tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm()
  }
  // Hàm xử lí sự kiện sửa 1 phần tử trong tasklist
  onUpdate = (id) => {
    let {tasks} = this.state
    let index = this.findIndex(id)
    let tasksing = tasks[index]
    this.setState({
      tasksing : tasksing
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onShowForm()
  }
  // Hàm xử lí sự kiện lọc
  onFilter = (filtername, filterstatus) =>{
    // Chuyển filterstatus sang dạng số
    filterstatus = parseInt(filterstatus, 10);
    this.setState({
      filter : {
        name : filtername.toLowerCase(),
        status : filterstatus
      }
    });
  }
  // Hàm sử lí sự kiện tìm kiếm
  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }
  onSort = (sortBy, sortValue) => {
   this.setState({
     sortBy : sortBy,
     sortValue : sortValue
   })
  }
  render(){
    let {tasks, isDisplayForm, tasksing, filter, keyword, sortBy, sortValue} = this.state; //Cách viết này tương tự với: let tasks = this.state.tasks
    // lọc nội dung trong list
    if(filter){
      // Lọc theo tên được nhập vào
      if(filter.name!==null){
       tasks = tasks.filter((task) =>{
         return task.name.toLowerCase().indexOf(filter.name) !== -1;
       });
      }
      // Lọc theo trạng thái
      if(filter.status) {
        tasks = tasks.filter((task) =>{
          if(filter.status === 0) {
            return task
          }else {
            return task.status === filter.status
          }
        })
      }
    }
    if(keyword){
      tasks = tasks.filter((task) =>{
        // Kiểm tra trong task.name có keyword tồn tại không.Trả về khác -1 là có còn -1 là không
        // toLower() là hàm để tạo 1 chuỗi mới đại diện cho chuỗi đang gọi ở dạng chữ thường
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    if(sortBy === 'name'){
      tasks.sort((a, b) => {
        if(a.name > b.name) return sortValue;
        if(a.name < b.name) return -sortValue;
        else return 0
      })
    }
    console.log(sortValue);
    let eleDisplayForm = isDisplayForm ? <Taskform onSubmit = {this.onSubmit} onCloseForm = {this.onCloseForm} tasksing = {tasksing}/> : ''
    return (
      <div className = "container">
        <div className = "text-center">
          <h1>Quản lí công việc</h1>
        </div>
        <div className = "row">
        <div className = {isDisplayForm ? "col-xs-6 col-sm-6 col-md-6 col-lg-6" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button className = "btn btn-outline-secondary heading" type = "button" onClick  = {this.toggleForm}>
            <i className = "fas fa-plus" />
            Thêm công việc
          </button>
          <Control onSearch = {this.onSearch} onSort = {this.onSort} sortBy = {sortBy} sortValue = {sortValue}/>
          <Tasklist tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDelete = {this.onDelete} onUpdate = {this.onUpdate} onFilter = {this.onFilter}/>
        </div>
        <div className = {isDisplayForm ? "col-xs-6 col-sm-6 col-md-6 col-lg-6" : ''}>
          {eleDisplayForm}
        </div>
          
        </div>
      </div>
    );
  }
  }
 

export default App;
