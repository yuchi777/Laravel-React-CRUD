import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

class CreateModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeName: null,
            employeeSalary: null,
        }
    }


    //Creating employee name state
    inputEmployeeName = (event) => {
        this.setState({
            employeeName: event.target.value,
        })
    }
    inputEmployeeSalary = (event) => {
        this.setState({
            employeeSalary: event.target.value,
        })
    }

    //Storing Employee Data
    storeEmployeeData = () => {
        axios.post('/store/employee/data', {
            employeeName: this.state.employeeName,
            employeeSalary: this.state.employeeSalary
        }).then(() => {
            toast.success('Employee Saved successfully')
            setTimeout(() => {
                location.reload();
            }, 2000)
        })
    }

    render() {
        return (
            <>
                <div className="row text-right mb-3 pb-3">
                    <button 
                    type="button"
                    className='btn btn-info text-right col-3 offset-md-9'
                    data-bs-toggle="modal" 
                    data-bs-target="#createModal"
                    >
                        Add New Employee
                    </button>
                </div>
                <div className="modal fade" id={"createModal"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Employee Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className='form' action="">
                                    <div className="form-group">
                                        <label htmlFor="employeeName">Name: </label>
                                        <input
                                            className='form-control mb-3 pb-3'
                                            type="text"
                                            id='employeeName'
                                            placeholder='name here'
                                            onChange={this.inputEmployeeName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="employeeSalary">Salary: </label>
                                        <input
                                            className='form-control mb-3 pb-3'
                                            type="text"
                                            id='employeeSalary'
                                            placeholder='salary here'
                                            onChange={this.inputEmployeeSalary}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-info"
                                data-bs-dismiss="modal"
                                onClick={this.storeEmployeeData}
                            >
                                Store
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                        </div>

                        
                    </div>
                </div>
            </>
        )
    }
}

export default CreateModal