import React, { Component } from 'react'
import { connect } from 'react-redux'





class InputForm extends Component {
  handleInput = e => {
    const { id, value } = e.target;
    let message = ""
    let dataType = e.target.getAttribute("data-type");
    // eslint-disable-next-line default-case
    switch (dataType) {
      case "letter": {
        let regexLetter = /^[a-zA-Z\s]*$/;
        if (!regexLetter.test(value.trim())) {
          message =  ' phải là dạng ký tự';
        }
        break;
      }
      case "number": {
        let min = JSON.parse(e.target.getAttribute("min-maxLength"))[0];
        let max = JSON.parse(e.target.getAttribute("min-maxLength"))[1];
        if (value.length < min || value.length > max) {
          message = ` phải có độ dài từ ${min} số đến ${max} số`
        }
        break;
      }
      // eslint-disable-next-line no-fallthrough
      case "email": {
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!mailformat.test(value)) {
          message ='chưa đúng dạng chuẩn của email'
          break;
        }
      }
    }
    if (value.trim() == "") {
      message =  " Không được bỏ trống";
    }
        if (id == "key") {
     let duplicateKey =  this.props.students.find(student => student.key == e.target.value)
        if (duplicateKey) {
          message =  " đã tồn tại"
          const action= {
            type: "HANLDE_KEY",
            payload: {message, id}
          }
          this.props.dispatch(action);
        }
    }
    const action = {
      type: "HANDLE_CHANGE",
      payload: {
        id: id,
        value: value
      }
    }
    const actionError = {
      type: "HANDLE_ERROR",
      payload: { message, id }
    }
    // let uniqueId = e.target.getAttribute("uniqe");
    this.props.dispatch(action);
    this.props.dispatch(actionError);
  }
  checkValidForm = () => {
    const errors = { ...this.props.errors }
    let output = false;
    for (let key in errors) {
      if (errors[key] !== "") {
        output = true;
        break
      }
    }
    return output
  }
  handleSubmit = e => {
    if (this.checkValidForm()) {
      return;
    }
    const values = { ...this.props.student };
    const action = {
      type: "HANDLE_SUBMIT",
      payload: values
    }
    this.props.dispatch(action)
    const reset = {
      type: "HANDLE_RESET",
      payload: null,
    }
    this.props.dispatch(reset);

  }
  handleUpdate = () => {
    if (this.checkValidForm()) {
      return;
    }
    const student = { ...this.props.student };
    const action = {
      type: "HANDLE_UPDATE",
      payload: student
    }
    this.props.dispatch(action)
    const disabled = {
      type: "HANDLE_iSDISABLEd",
      payload: null
    }
    this.props.dispatch(disabled)
  }
  render() {
    const { student, errors, disabled } = this.props;
    console.log(disabled);
    return (
      <div className='container mb-5'>
        <form className='card'>
          <div className="card-header bg-dark">
            <h3 className='text-white'>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-6">
                <p className='d-inline-block'>Mã SV</p> <span className='text-danger'>{errors.id}</span>
                <input
                  type="number" id='id' uniqe="id"
                  min-maxLength="[2,5]" data-type="number"
                  className='form-control' onChange={this.handleInput}
                  value={student.id} disabled={!disabled}
                // disabled={this.props.student}
                />
              </div>
              <div className="col-6">
                <p className='d-inline-block' >Họ Tên</p> <span className='text-danger'>{errors.name}</span>
                <input
                  type="text" id='name' data-type="letter" className='form-control'
                  onChange={this.handleInput}
                  value={student.name}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p className='d-inline-block'>Số Điện Thoại</p> <span className='text-danger'>{errors.phoneNumber}</span>
                <input type="number" id='phoneNumber' className='form-control' min-maxLength="[8,10]"
                  data-type="number" onChange={this.handleInput}
                  value={student.phoneNumber}
                />
              </div>
              <div className="col-6">
                <p className='d-inline-block'>Email</p> <span className='text-danger'>{errors.email}</span>
                <input type="email" id='email' className='form-control' onChange={this.handleInput} data-type="email"
                  value={student.email}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type='button' onClick={this.handleSubmit} className='btn btn-success' disabled={!disabled}>Thêm</button>
            <button type='button' className='btn btn-primary mx-2' onClick={this.handleUpdate} disabled={disabled}>Update</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
  students: state.students,
  student: state.student,
  errors: state.errors,
  disabled: state.disabled
})

export default connect(mapStateToProps)(InputForm);
