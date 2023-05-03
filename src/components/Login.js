import React, { useState } from 'react'
import { Button, Container, Form, Row, Col, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Login({isAdmin}) {
    const [rememberme,setRememberme]=useState(false);
    const navigate=useNavigate();
  

    const handleSubmit=()=>{
        if(rememberme===true){
          localStorage.setItem('access_token', '12345678');
        }
        else{
          sessionStorage.setItem('access_token', '12345678');
        }
        // determine if authorized based on isAdmin prop
        if(isAdmin===true){
          navigate('/Admin/Dashboard');
        }
        else{
          navigate('/Userpage');
        }
    }
  return (
    <section className="py-4 py-xl-5 googlesans">
  <Container>
    <Row className="mb-5">
      <div className="col-md-8 col-xl-6 text-center mx-auto">
        <h2>Log in</h2>
        <p>Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
      </div>
    </Row>
    <Row className="d-flex justify-content-center">
      <Col className="col-md-6 col-xl-4">
        <Card className="card mb-5 rounded-4">
          <div className="card-body d-flex flex-column align-items-center">
            <div className="my-4"><svg className="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg></div>
            <Form className="text-center" onSubmit={handleSubmit}>
              <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" style={{boxShadow: '0px 0px'}} /></div>
              <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" style={{boxShadow: '0px 0px'}} /></div>
              <div className="mb-3 form-check d-flex gap-2">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{boxShadow: '0px 0px'}} checked={rememberme} onChange={(e) => setRememberme(e.target.checked)}/>
                <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
              </div>
              <div className="mb-3"><Button className="btn btn-primary d-block w-100" type="submit">Login</Button></div>
              <p className="text-muted">Forgot your password?</p>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

  )
}

export default Login