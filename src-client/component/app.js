'use strict';

require('fetch');
var React    = require('react');
var Resource = require('./resource');
var _slice   = Array.prototype.slice;

var App = React.createClass({
  loadVPCFromServer: function () {
    var self = this;
    fetch('/api/v1/vpcs')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        self.setState({
          vpcs: json.Vpcs
        })
      });
  },
  getInitialState: function () {
    return {
      vpcs: []
    };
  },
  componentDidMount: function () {
    this.loadVPCFromServer();
  },
  render: function () {
    var resources = this.state.vpcs.map(function (vpc, i) {
      var name;
      var j;
      var tag;

      for (j = 0; j < vpc.Tags.length; j++) {
        tag = vpc.Tags[j];
        if (tag.Key === 'Name') {
          name = tag.Value;
          break;
        }
      }

      return <Resource key={ vpc.VpcId } index={ i } name={ name } />;
    });
    return (
      <svg width="100%" height="100%">
        { resources }
      </svg>
    );
  }
});

module.exports = App;
