<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Log;
use Exception;

class EmployeesController extends Controller
{
    //Get Employee List from database

    public function getEmployeeList(){
        
        try
        {
            // $employees = Employee::all();
            // $employees = Employee::limit(6)->get();
            // $employees = Employee::orderBy('id','DESC')->get();
            $employees = Employee::orderBy('id','DESC')->paginate(10);
            // $employees = Employee::query()->orderByDesc('id')->paginate(10);
            return response()->json($employees);
            // return dd($employees);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }

    }

    // Get individual employee details
    public function getEmployeeDetails(Request $request){
        try
        {
            $employeeData = Employee::findOrFail($request->get('employeeId'));
            return response()->json($employeeData);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }


    //updating employee date
    public function updateEmployeeData(Request $request){
        try
        {
            // dd($request->all());
            $employeeId = $request->get('employeeId');
            $employeeName = $request->get('employeeName');
            $employeeSalary = $request->get('employeeSalary');

            Employee::where('id', $employeeId)->update([
                'employee_name'=>$employeeName,
                'salary'=>$employeeSalary
            ]);

            return response()->json([
                'employee_name'=>$employeeName,
                'salary'=>$employeeSalary
            ]);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }


    //Deleting Employee
    public function deleteEmployeeData(Employee $modalId){
        try
        {
            $modalId->delete();
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    //Storing new Employee
    public function createEmployeeData(Request $request){
        try
        {
            $employeeName = $request->get('employeeName');
            $employeeSalary = $request->get('employeeSalary');
            Employee::create([
                'employee_name'=>$employeeName,
                'salary'=>$employeeSalary
            ]);

            return response()->json([
                'employee_name'=>$employeeName,
                'salary'=>$employeeSalary
            ]);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

}
