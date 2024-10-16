import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();  
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Password and confirm password do not match')
    }

    try {

        setError('');
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value)
    } catch (err) {
        console.log(err);
        setError('Failed to create an account')
    }

    setLoading(false);

  }



  return (
    <>

        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className='w-100' type='submit' onClick={handleSubmit}>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? Login (todo Link)
        </div>

    </>
  )
}

export default Signup