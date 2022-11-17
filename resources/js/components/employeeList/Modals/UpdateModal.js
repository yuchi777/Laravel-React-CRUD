import axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class UpdateModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeName:null,
            employeeSalary:null,
        }
    }

    //Updating employee name state
    inputEmployeeName = (event) =>{
        this.setState({
            employeeName:event.target.value,
        })
    }
    inputEmployeeSalary = (event) =>{
        this.setState({
            employeeSalary:event.target.value,
        })
    }

    //靜態方法static function
    // 會在一個 component 被 render 前被呼叫，不管是在首次 mount 時或後續的更新時。它應該回傳一個 object 以更新 state，或回傳 null 以表示不需要更新任何 state。
    //static method 只存在 class 中，不能被 instance 所提取，只能透過指稱到該 class 才能使用該方法，可以透過 static 這個關鍵字來建立 static method：
    static getDerivedStateFromProps (props, current_state){

        let employeeUpdate = {
            employeeName:null,
            employeeSalary:null,
        }

        //Updating data from input
        if(current_state.employeeName && (current_state.employeeName !== props.employeeData.currentEmployeeName)){
            return null;
        }
        if(current_state.employeeSalary && (current_state.employeeSalary !== props.employeeData.currentEmployeeSalary)){
            return null;
        }


        //Updating data from props Below
        if(current_state.employeeName !== props.employeeData.currentEmployeeName ||
            current_state.employeeName === props.employeeData.currentEmployeeName){
            employeeUpdate.employeeName = props.employeeData.currentEmployeeName;
        }
        if(current_state.employeeSalary !== props.employeeData.currentEmployeeSalary ||
            current_state.employeeSalary === props.employeeData.currentEmployeeSalary){
            employeeUpdate.employeeSalary = props.employeeData.currentEmployeeSalary;
        }


        return employeeUpdate

    }


    //Updating employee data
    updateEmployeeData = () => {
        axios.post('/update/employee/data',{
            employeeId:this.props.modalId,
            employeeName:this.state.employeeName,
            employeeSalary:this.state.employeeSalary,
        }).then((res)=>{
            // console.log(res);
            // alert('update success')
            toast.success('Updated Successully')
            setTimeout(()=>{
                location.reload();
            },2000)
        })
    }

    render() {
        return (
            <div className="modal fade" id={"updateModal"+this.props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Employee Details</h5>
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
                                    value={this.state.employeeName ?? ""}
                                    onChange={this.inputEmployeeName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeSalary">Salary: </label>
                                    <input 
                                    className='form-control mb-3 pb-3'
                                    type="text" 
                                    id='employeeSalary' 
                                    value={this.state.employeeSalary ?? ""}
                                    onChange={this.inputEmployeeSalary}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <input 
                            type="submit" 
                            className='btn btn-info' 
                            id='employeeName' 
                            value="Update" 
                            onClick={this.updateEmployeeData}
                            />
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateModal