import React, { Component } from 'react';
import './SearchBar.css';
import { Input } from 'antd';

export default class SearchBar extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    const { query, onLabelChange } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Input placeholder="Type to search..." value={query} allowClear onChange={onLabelChange} />
      </form>
    );
  }
}
