import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-flexbox-grid';
import {Redirect} from 'react-router-dom';
import superagent from 'superagent';


const paper = {
    marginTop:'100px',
    backgroundColor:'#b0b0b0'
}
const field = {
 paddingLeft:5
}
const register = {
    marginTop:20,
    marginBottom:20,
}


export default class Signup extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        username:'',
        usernameError:'',
        firstname:'',
        firstnameError:'',
        lastname:'',
        lastnameError:'',
        password:'',
        passwordError:'',
        email:'',
        emailError:'',
        signupSuccess: false
    };
    this.setUsername = this.setUsername.bind(this);
    this.setFirstname = this.setFirstname.bind(this);
    this.setLastname = this.setLastname.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
    
}
setUsername(event) {
    this.setState({
        username:event.target.value,
        usernameError:''
    });
}
setFirstname(event) {
    this.setState({
        firstname:event.target.value,
        firstnameError:''
    });
}
setLastname(event) {
    this.setState({
        lastname:event.target.value,
        lastnameError:''
    });
}
setEmail(event) {
    this.setState({
        email:event.target.value,
        emailError:''
    });
}
setPassword(event) {
    this.setState({
        password:event.target.value,
        passwordError:''
    });
}

// Signup function is called back and passing details to signup routes

signUp(){
    let self=this;
    if(this.validationSuccess()) {
        superagent
        .post('/users/signup')
        .send({username:self.state.username,firstname:self.state.firstname,lastname:self.state.lastname,email:self.state.email,password:self.state.password})
        .end(function(err,res){
        if(err){
            console.log('error: ', err)
        }
        else {
            let status = res.body.status;
            if(status === 'signup success') {
                self.setState({
                    signupSuccess:true
                });
                 console.log('signup success');
            }
            else if(status === 'username already exsist'){
                self.setState({
                     usernameError:'username already exsists'
                });
            }
            else {
                console.log('signup failed');
            }
        }
    });

     }
}

// Validating the textfields

validationSuccess(){
    if(this.state.username.length==0){
        this.setState({
            usernameError:'Username cannot be empty'
        });
    }
    else if(this.state.firstname.length==0){
        this.setState({
            firstnameError:'Firstname cannot be empty'
        });
    }
    else if(this.state.lastname.length==0){
        this.setState({
            lastnameError:'Lastname cannot be empty'
        });
    }
    else if(this.state.email.length==0){
        this.setState({
            emailError:'Email cannot be empty'
        });
    }
    else if(this.state.password.length==0){
        this.setState({
            passwordError:' password cannot be empty'
        });
    }
    else{
        return true;
    }
    return false;
}

  render() {
      if(this.state.signupSuccess){
          return (
          <Redirect to='/login' />
          )
      }
    return (
    <div>
     <Row center="xs">
     
     <Col md={9}>
     <Paper zDepth={5} style={paper}>
     <h1>Register Here !!!</h1>
    <TextField hintText="User name" 
               value={this.state.username}
               errorText={this.state.usernameError}
               style={field}
               underlineShow={false}
               onChange={this.setUsername}/>
    <Divider />
    <TextField hintText="First name"
               value={this.state.firstname}
               errorText={this.state.firstnameError}
               style={field}
               underlineShow={false}
               onChange={this.setFirstname}/>
    <Divider />
    <TextField hintText="Last name"
               value={this.state.lastname}
               errorText={this.state.lastnameError}
               style={field} 
               underlineShow={false} 
               onChange={this.setLastname}/>
    <Divider />
    <TextField hintText="Email address"
               value={this.state.email}
               errorText={this.state.emailError}
               style={field} 
               underlineShow={false}
               onChange={this.setEmail}/>
    <Divider />
    <TextField hintText="Password"
               value={this.state.password}
               errorText={this.state.passwordError}
               style={field} 
               underlineShow={false} 
               onChange={this.setPassword}/>
    <Divider />
    <RaisedButton  label="Register" style={register} primary={true} onClick={this.signUp}/>
  </Paper>
  </Col>
  </Row>
  </div>);
  }
}



