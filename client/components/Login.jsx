import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {isLoggedIn} from '../index.js';
import Cookies from 'universal-cookie';
const styles= {
        marginTop:'150px',
        width:'500px',
        backgroundColor:'#b0b0b0'
}

const text = {
      marginRight: 200,
}

const login = {
    marginTop:10,
    marginBottom:10,
    textDecoration : 'none',
    color:'#424242'
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      loginSuccess: false,
      click:false,
      alreadyLoggedIn: false
    };
    this.login = this.login.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      usernameError: '',
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      passwordError: '',
      password: event.target.value
    });
  }

  handleClose(){
    this.setState({open: false});  
  } 
  login() {
    let self = this;
    if(this.validationSuccess()) {
      superagent
        .post('/users/login')
        .send({username: self.state.username, password: self.state.password})
        .end(function(err, res) {
            if(err) console.log('error: ', err);
            else {
                let status = res.body.status;
                if(status === 'login success') {
                    const cookies = new Cookies();
                    cookies.set('username', self.state.username)
                      self.setState({
                        loginSuccess: true
                      });
                  console.log('login success');
                } else {
                    alert('Invalid login');
                    /*self.setState({
                    loginSuccess: false
                  });
                  console.log('login failed');*/
                }
            }
        });
    }
  }

  validationSuccess() {
    if(this.state.username.length == 0) {
      this.setState({
        usernameError: 'This field cannot be left empty.'
      });
    } else if(this.state.password.length == 0) {
      this.setState({
        passwordError: 'This field cannot be left empty.'
      });
    } else {
      return true;
    }
    return false;
  }
componentWillMount() {
     this.setState({
       alreadyLoggedIn: isLoggedIn()
     });
 }
  render() {
 const actions = [
      <FlatButton
        label="ok"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      ];
      
    if(this.state.loginSuccess || this.state.alreadyLoggedIn) {
      return (
        <Redirect to='/movieapp' push />
      )
    }

    return (
     <div >
        <Row center="xs">
            <Col md={9}>
                <Paper style={styles} zDepth={5}>
      
                    <h1>Welcome to Movieapp</h1>

                    <TextField
                      hintText="Username"
                      value={this.state.username}
                      errorText={this.state.usernameError}
                      style={text}
                      underlineShow={false}
                      onChange={this.onUsernameChange} />
                    <Divider />
                    <TextField
                      hintText="Password"
                      type="password"
                      value={this.state.password}
                      errorText={this.state.passwordError}
                      style={text}
                      underlineShow={false}
                      onChange={this.onPasswordChange} />
                    <Divider />

                <center>
                    <RaisedButton  label="Login" style={login} primary={true} onClick={this.login}/>
                </center>
                    <Link style={login} to = '/signup'>New User?<center><RaisedButton  label="Signup"  primary={true} /></center></Link>

            </Paper>
        </Col>
    </Row>
    </div>
    );
  }
}
