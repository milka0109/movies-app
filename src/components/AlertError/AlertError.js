import React from 'react';
import { Alert } from 'antd';

function AlertError({ errorMessage }) {
  return <Alert message="Error: " description={errorMessage} type="error" showIcon className="alert-error" />;
}
export default AlertError;
