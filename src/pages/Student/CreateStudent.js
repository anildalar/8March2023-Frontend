//1 Import Area
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

let surname='dollor';
//2. Defination area

function CreateStudent() {
    //2.1 Hooks Area
    //let teacher='';
    const [teacher,setTeacher] = useState([]);
    const [students,setStudents] = useState([]);
    const [teacherName,setTeacherName] = useState([]);
    //useSomething() will a hook function
    //useEffect(cbfn,Arr);
    useEffect(()=>{
        fetch(`http://localhost:1337/api/students?populate=*`,{
            method: 'GET',
        })
        .then(res=>res.json())
        .then(data=>{
            let name2='anil';
            console.log('Student --->>>>>',data.data);
            //students = data.data;
            setStudents(data.data);
            
        })
        .catch()
        // I want to call the get all teacher api
        fetch(`http://localhost:1337/api/teachers`,{
            method:"GET"
        })
        .then(res=> res.json())
        .then((data)=>{
            console.log('Teacher --->>>>>',data.data);
            setTeacher(data.data)
            //set/ the hook varaible 
        })  
        .catch(()=>{

        });
    },[]);

    //2.2 Function Defination Area
    let createStudent = ()=>{
        //console.log(document.getElementById('teacher').value);
       // alert("OKOKOKOKJOK");
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
            //window.location.reload();
            document.querySelector('table#myTable > tbody').innerHTML +=   `<tr>
                                                                                <td>1</td>
                                                                                <td>${document.getElementById('student_name').value}</td>
                                                                                <td>${teacherName}</td>
                                                                                <td>
                                                                                    <Button class="btn btn-sm me-1 btn-success">View</Button>
                                                                                    <Button class="btn btn-sm me-1 btn-primary">Edit</Button>
                                                                                    <Button id="" class="btn btn-sm me-1 btn-danger">Delete</Button>
                                                                                </td>
                                                                            </tr>`;
            
            console.log(data);
        })
        .catch();
        
    }
    
    let deleteStudent = (e)=>{
        let tr = e.target.closest('tr');
        console.log(tr.querySelector('td:first-child').innerHTML);
        let sid = tr.querySelector('td:first-child').innerHTML;

        let x = window.confirm('Do you really want to delete student');
        console.log(typeof x);
        if(x === true){
            //alert('Lets call the delete API');
            fetch(`http://localhost:1337/api/students/${sid}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                tr.remove();
                alert('Studetn Deleted SUccessfully');
            })
            .catch(err=>err)
        }

       // alert('OKOKKOK');
    }

    let handleChange = (e)=>{
        //alert(e.target.value); //returns the selected value
        //alert(e.target.innerHTML); //returns the entire select with all the options
        var options = e.target.getElementsByTagName("option");
        //alert(options);
        var optionHTML = options[e.target.selectedIndex].innerHTML;  
        //alert(optionHTML); //this is what I want, but it works now
        setTeacherName(options[e.target.selectedIndex].innerHTML);
    }

    //2.3 Return Statement
    return (
        <>
            <div className="container">
                <h1 className="text-center mt-5">Create Student {surname}</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Select Teacher</Form.Label>
                        <Form.Select id="teacher" name="teacher[]" aria-label="Default select example" onChange={(e)=>{ handleChange(e) }}>
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
                <Table striped bordered hover id="myTable"> 
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Teacher Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((cv,idx,arr)=>{ 
                                return  <tr>
                                            <td>{cv.id}</td>
                                            <td>{cv.attributes.name}</td>
                                            <td>{
                                                   cv.attributes.teachers.data.map((cv2,idx2,arr2)=>{
                                                        return cv2.attributes.name;
                                                    }).toString()
                                                }
                                                
                                            </td>
                                            <td>
                                                <Button className="btn btn-sm me-1 btn-success">View</Button>
                                                <Button className="btn btn-sm me-1 btn-primary">Edit</Button>
                                                <Button id={`sid${cv.id}`} className="btn btn-sm me-1 btn-danger" onClick={(e)=>{ deleteStudent(e) }}>Delete</Button>
                                            </td>
                                        </tr>
                                    })
                        }
                        
                    </tbody>
                </Table>
            </div>
        </>
    )
}


//3. Export Area

export default CreateStudent;