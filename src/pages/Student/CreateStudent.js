import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

export default function CreateStudent() {

    return (
        <>
            <div className="container">

                <h1 className="text-center mt-5">Create Student</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Select Teacher</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
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
