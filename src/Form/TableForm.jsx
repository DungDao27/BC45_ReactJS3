import React, { Component } from 'react'
import { connect } from 'react-redux'
class TableField extends Component {
  handleDelete = key => {
    const action = {
      type: "HANDLE_DELETE",
      payload: key
    }
    this.props.dispatch(action)
  }
  handleEdit = values => {
    const action = {
      type: "HANDLE_EDIT",
      payload: values
    }
    this.props.dispatch(action)
    const disabled = {
      type: "HANDLE_DISABLE",
      payload: null
    }
    this.props.dispatch(disabled)
  }
  handleInput = e => {
    let searchString = e.target.value;
    const action = {
      type: "search",
      payload: searchString
    }
    this.props.dispatch(action)
  }
  render() {
    const { students } = this.props
    let studentsArray = null;
    if (students.length && this.props.searchString) {
      studentsArray = students.filter(student => student.key.includes(this.props.searchString))
    } else {
      studentsArray = [...students]
    }

    return (
      <div className='container'>
        <div class="row mb-3">
          <div class="col">
            <div>
              <p>Tìm kiếm sinh viên theo mã</p>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập mã sinh viên" onChange={this.handleInput} />
                <div className="input-group-prepend">
                  <span className="input-group-text" id="btnSearch"><i className="fa fa-search" /></span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentsArray.length > 0 && studentsArray.map(student => {
              return <tr>
                <td>{student.key}</td>
                <td>{student.name}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>
                  <button className='btn btn-primary mx-3' onClick={() => {
                    this.handleEdit(student)
                  }}>Edit</button>
                  <button className='btn btn-danger' onClick={() => {
                    this.handleDelete(student.key)
                  }}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students,
  searchString: state.searchString
})

export default connect(mapStateToProps)(TableField);
