import React from 'react';
import Header from './Header.jsx';

export default class MovieApp extends React.Component{

  render() {
    return (
      <div>
          <Header />
          <div>
            {this.props.children}
          </div>
      </div>
    );
  }
}
