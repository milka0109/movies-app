import React from 'react';
import { Spin } from 'antd';
import './Loader.css';

function Loader() {
  return (
    <div className="spinner">
      <Spin size="default" />
    </div>
  );
}

export default Loader;
