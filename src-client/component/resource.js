'use strict';

var React = require('react');

var Resource = React.createClass({
  getTransform: function () {
    return `translate(${this.props.index * 220 + 20}, 20)`;
  },
  render: function () {
    return (
      <g className="o-resource" transform={ this.getTransform() }>
        <rect className="o-resource-box" x="0" y="0" width="200" height="250" />
        <text className="o-resource-name" x="10" y="25">{ this.props.name }</text>
        <text className="o-resource-type" x="10" y="240">VPC</text>
      </g>
    );
  }
});

module.exports = Resource;
