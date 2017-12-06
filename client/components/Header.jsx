import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import superagent from 'superagent';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const styles= {
    decorate:{
          textDecoration : 'none'
    },
    text:{
        textAlign:'center',
        backgroundColor:'#81817d'
    }
 
}

export default class Movieapp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        logout:false
        
    };
     this.handleToggle = this.handleToggle.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.logOut = this.logOut.bind(this);
  }


  handleToggle(){
      this.setState({open: true});
  }

    
  handleClose(){
    this.setState({open: false});  
  } 
  
logOut(){
     let self=this;
     console.log("inside logout");
     superagent
     .get('/users/logout')
     .end(function(err, data){
         if(err){
             console.log("error in logout");
         } else {
             console.log("logout success");
             const cookies = new Cookies();
             cookies.remove('username');

             self.setState({
                 logout:true
             });
         }
         });
 }
  render(){
      if(this.state.logout){
          return(
          <Redirect to='/' />)
      }
    return(

        <div>
        
            <AppBar style={styles.text}
            
            title="Cine Max"
            onLeftIconButtonTouchTap={this.handleToggle}
            />

            <Drawer 
              style={styles.decorate}
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <Link style={styles.decorate} to = '/movieapp/searchmovie'> <MenuItem onTouchTap={this.handleClose}>Search</MenuItem></Link>
              <Link style={styles.decorate} to='/movieapp/displayfav'> <MenuItem onTouchTap={this.handleClose}>Favourites</MenuItem></Link>
              <Divider />
              <MenuItem label="sign out" onTouchTap={this.logOut}>Sign out</MenuItem>
            </Drawer>
           
    
        </div>

    );
  }
}