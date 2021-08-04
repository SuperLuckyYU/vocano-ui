import React from 'react';
import { Icon } from 'vocano-ui';
import './index.css';

export default () => {
  const data: string[] = [
    'angle-down',
    'angle-up',
    'angle-right',
    'angle-left',
    'check',
    'times',
    'plus',
    'minus',
    'exclamation',
  ];

  return (
    <div>
      {data.map((item, index) => (
          <div className="icon-demo-wrapper" key={index}>
            <Icon icon={item} className="icon-demo-item" />
            <span className="icon-demo-name">{item}</span>
          </div>
        ))}
    </div>
  );
};
