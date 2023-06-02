import React, { Component } from 'react'
import InputForm from './InputForm'
import TableForm from './TableForm'

export default class Form extends Component {
    render() {
        return (
            <div className='container'>
                <InputForm></InputForm>
                <TableForm></TableForm>
            </div>
        )
    }
}
