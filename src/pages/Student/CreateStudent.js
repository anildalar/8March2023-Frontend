//1 Import Area
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'


//2. Defination area

function CreateStudent() {
    //2.1 Hooks Area
    //let teacher='';
    const [teacher,setTeacher] = useState([]);
    //useSomething() will a hook function
    //useEffect(cbfn,Arr);
    useEffect(()=>{
        // I want to call the get all teacher api
        fetch(`http://localhost:1337/api/teachers`,{
            method:"GET"
        })
        .then(res=> res.json())
        .then((data)=>{
            console.log(data.data);
            setTeacher(data.data)
            //set/ the hook varaible 
        })  
        .catch(()=>{

        });
    },[]);

    //2.2 Function Defination Area
    let createStudent = ()=>{
        //alert("OKOKOKOKJOK");
        let payload = {
            "data": {
              "name": document.getElementById('student_name').value,
              "teachers": [parseInt(document.getElementById('teacher').value)]
            }
        }

        //Our payload is ready to send to the server
        console.log(payload);

        fetch(`http://localhost:1337/api/students`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then(data=>{
            alert("Student Inserted Succesfully");
            console.log(data);
        })
        .catch();
    }


    //2.3 Return Statement
    return (
        <>
            <div className="container">
                <h1 className="text-center mt-5">Create Student</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Select Teacher</Form.Label>
                        <Form.Select id="teacher" aria-label="Default select example" multiple>
                            {
                                teacher.map((cv,idx,arr)=>{
                                    console.log(cv);
                                    return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                                })
                            }
                            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control id="student_name" type="text" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=>{ createStudent()  }}>
                        Submit
                    </Button>
                </Form>
                <br />

                <hr />
                
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>StudentName</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>
                                <Button className="btn btn-sm me-1 btn-success">View</Button>
                                <Button className="btn btn-sm me-1 btn-primary">Edit</Button>
                                <Button className="btn btn-sm me-1 btn-danger">Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}


//3. Export Area

export default CreateStudent;