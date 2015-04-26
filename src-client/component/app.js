'use strict';

const React    = require('react');
const Resource = require('./resource');

class App extends React.Component {
  render() {
    return (
      <svg width="100%" height="100%">
        <Resource />
      </svg>
    );
  }
}

module.exports = App;
