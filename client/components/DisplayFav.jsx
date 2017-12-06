import React from 'react';
import superagent from 'superagent';
import DisplayMovie from './DisplayMovie.jsx';


export default class DisplayFav extends React.Component {
    
    constructor(){
        super();
        this.state={
            movies: []
        };
        this.deleteMovie = this.deleteMovie.bind(this);
    }
     
    deleteMovie(movietitle) {
        let oldMovies = this.state.movies;
        let newMovies = oldMovies.filter(function(movie) {
            return movie.title != movietitle
        });
        this.setState({
            movies: newMovies
        });
    }
    
    componentWillMount() {
       let self=this;
       superagent
        .get('/movies/view')
        .end(function(err, res) {
            if(err) console.log('error: ', err);
            else {
                self.setState({
                    movies: res.body
                });     
            }
        });
    }
    
    render() {
        let self = this;
        return(
            <div>
            <center><h1>My Favourite Movies</h1></center>
            {
               this.state.movies.map(function(movie, key) {
                   return <DisplayMovie movie={movie} action='Delete' onDelete={self.deleteMovie} key={key}/>
               })
            }
            </div>
        );
    }
}