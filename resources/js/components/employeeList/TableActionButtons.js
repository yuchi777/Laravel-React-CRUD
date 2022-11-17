import axios from 'axios'
import React, { Component } from 'react'
import ViewModal from './Modals/ViewModal'
import UpdateModal from './Modals/UpdateModal';
import DeleteModal from './Modals/DeleteModal';

class TableActionButtons extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentEmployeeName:null,
            currentEmployeeSalary:null,
        }
    }

    getEmployeeDetails = (id) => {
        axios.post('/get/individual/employee/details',{
            employeeId: id
        }).then((res)=>{
            // console.log(res.data);
            this.setState({
                currentEmployeeName: res.data.employee_name,
                currentEmployeeSalary: res.data.salary,
            })
        })
    }

    render() {
        return (
            <div className="btn-group" role="group" >
                <button 
                type="button" 
                className="btn btn-outline-primary" 
                data-bs-toggle="modal" 
                data-bs-target={'#viewModal'+ this.props.eachRowId}
                onClick={()=>{this.getEmployeeDetails(this.props.eachRowId)}}
                >
                    View
                </button>
                <ViewModal modalId={this.props.eachRowId} employeeData={this.state}/>
                
                <button 
                type="button" 
                className="btn btn-outline-primary"
                data-bs-toggle="modal" 
                data-bs-target={'#updateModal'+ this.props.eachRowId}
                onClick={()=>{this.getEmployeeDetails(this.props.eachRowId)}}
                >
                    Update
                </button>
                <UpdateModal modalId={this.props.eachRowId} employeeData={this.state}/>

                <button 
                type="button" 
                className="btn btn-danger"
                data-bs-toggle="modal" 
                data-bs-target={'#deleteModal'+ this.props.eachRowId}
                onClick={()=>{this.getEmployeeDetails(this.props.eachRowId)}}
                >
                    Delete
                </button>
                <DeleteModal modalId={this.props.eachRowId} employeeData={this.state}/>
            </div>
        )
    }
}

export default TableActionButtons