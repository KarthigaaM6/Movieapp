import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import superagent from 'superagent';
import RaisedButton from 'material-ui/RaisedButton';
import DisplayMovie from './DisplayMovie.jsx';

const style = {
    marginTop:'50px',
    marginLeft:'350px'
}

export default class SearchMovie extends React.Component {
    constructor(){
        super();
        this.state = {
            searchText:"",
            movies:[],
            dataSource: []
            
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.displayMovie = this.displayMovie.bind(this);
    }
     
    handleUpdateInput(userText) {
        let self = this
        superagent
            .get('https://api.themoviedb.org/3/search/movie?api_key=986b4a548b06fde5eed671f30ebe47db&query=' + userText + '&page=1&include_adult=false')
            .end(function(err, res) {
                if(err) console.log('error: ', err)
                else {
                    console.log('movieList: ', res.body)
                    let top10movies = res.body.results.map(function(movie) {
                        return movie.title
                    })
                    console.log('movieTitles: ', top10movies)
                    self.setState({
                      dataSource: top10movies,
                      searchText:userText,
                    });
                }
            });
    };
    
    displayMovie() {
       let self=this;
       let searchText=this.state.searchText;
       superagent
       .get('https://api.themoviedb.org/3/search/movie?api_key=986b4a548b06fde5eed671f30ebe47db&query=' + searchText + '&page=1&include_adult=false')
         .end(function(err, res) {
                if(err) console.log('error: ', err)
                else{
                    self.setState({
                        movies:res.body.results
                    })
                    
                }
   })
   }
    render(){
        return(
            <div>
            <paper>
                <AutoComplete style={style}
                  hintText="Search Movie"
                  dataSource={this.state.dataSource}
                  searchText={this.state.SearchText}
                  onUpdateInput={this.handleUpdateInput}
                  onNewRequest={this.displayMovie}
                />
             
                <RaisedButton  label="Submit"  primary={true} onClick={this.displayMovie}/>
                </paper>
               {
                   this.state.movies.map(function(movie){
                       return<DisplayMovie movie={movie} action='Add to Favourite'/>
                   })
               }

           </div>
        );
    }
}