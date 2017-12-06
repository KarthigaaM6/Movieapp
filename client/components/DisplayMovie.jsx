import React from 'react';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
export default class DisplayMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             open:false,
             click:false,
             movietitle:this.props.movie.title,
             poster:this.props.movie.poster_path,
             releasedate:this.props.movie.release_date,
           
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addFavourites = this.addFavourites.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.deleteFavourite = this.deleteFavourite.bind(this);
    }
    
    handleMouseOver() {
        this.setState({
          open:true
        });
    }

    handleMouseOut() {
      this.setState({
        open:false
      });
    }
     handleClose() {
    this.setState({
        click: false
        });
  };
   onButtonClick() {
       if(this.props.action === 'Add to Favourite') {
           this.addFavourites();
           this.setState({click: true});
       } else if(this.props.action === 'Delete') {
           this.deleteFavourite();
       } else {
           console.log("Error occured in calling the function");
       }
   }

    addFavourites() {
    
      superagent
        .post('/movies/add')
        .send({
            title: this.state.movietitle,
            poster_path: this.state.poster,
            releasedate: this.state.releasedate,
            
        })
        .end(function(err, data){
            if(err){
                console.log("error");
                console.log("error in adding movie");
            } else {
                console.log("data added success");
                console.log("ADDED TO FAVOURITE LIST");
            }
        });
      }  
        
      deleteFavourite() {
         let self = this;
         superagent
            .post('/movies/delete')
            .send({title: this.state.movietitle})
            .end(function(err, res) {
                if(err) console.log('error: ', err);
                else {
                    if(res.body.status === 'Deleted Successfully') {
                         self.props.onDelete(self.state.movietitle);
                    }
                }   
            });
        }
      
    render(){
         const actions = [
              <FlatButton
                label="ok"
                primary={true}
                onTouchTap={this.handleClose}
              />,
     
    ];
        return(
        <div>
       
         <Row center="xs">
            <Col md={3}>
                <Card>
                    {this.state.open?<CardHeader
                      title={this.props.movie.title}
                    />:''}
                    <CardMedia  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                        <img src= {'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path}/>
                    </CardMedia>
                    <CardActions>
                        <RaisedButton label={this.props.action} onTouchTap={this.onButtonClick} />
                        <Dialog
                          actions={actions}
                          modal={false}
                          open={this.state.click}
                          onRequestClose={this.handleClose}
                        >
                        Added to Favourite List
                        </Dialog>
                    </CardActions>
                 </Card>
            </Col>
        </Row>
        </div>
        );
    }
}