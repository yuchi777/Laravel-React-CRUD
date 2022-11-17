import axios from 'axios';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import TableRow from './TableRow';
import CreateModal from './Modals/CreateModal';

class Table extends Component {


    constructor(props){
        super(props);

        this.state = {
            employees:[],
            url:'/get/employee/list',
            pagination:[]
        }
    }

    //Life cycle method
    // componentDidMount(){
        
    // }

    componentWillMount(){
        this.getEmployeeList();
    }


    //Get Employee List (Data)
    getEmployeeList = () => {

        axios.get(this.state.url).then((res)=>{

            console.log(res.data.data);

            this.setState({
                employees: this.state.employees.length > 0 ? this.state.employees.concat(res.data.data) : res.data.data,
                url : res.data.next_page_url
            })

            this.makePagination(res.data)
        })


    }

    loadMore = () => {
        this.setState({
            url: this.state.pagination.next_page_url
        })
        this.getEmployeeList();
    }

    makePagination(data){
        let pagination = {

            current_page : data.current_page,
            last_page : data.last_page,
            next_page_url:data.next_page_url,
            prev_page_url: data.prev_page_url

        }

        this.setState({
            pagination:pagination
        })
    }


    render(){
        return (
            <div className="container">
                <ToastContainer />
                <CreateModal/>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" width="100px">#</th>
                                        <th scope="col" width="100px">Name</th>
                                        <th scope="col" width="100px">Salary</th>
                                        <th scope="col" width="100px">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.employees.map((data,index)=>{
                                            return <TableRow key={index} data={data}/>
                                        })
                                    }
                                    
                                </tbody>
    
                            </table>
                            <button className="btn btn-default" onClick={this.loadMore}>Load More Resulte</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Table;