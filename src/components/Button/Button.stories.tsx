import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { BaseButtonProps as ButtonProps } from './button';

export default {
  title: '组件总览/Button 按钮',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '点击后会触发一个操作。',
      },
    },
  },
  argTypes: {
    size: {
      description: '大小，只对按钮样式生效',
      options: ['lg', 'sm'],
      table: {
        defaultValue: { summary: 'lg' },
      },
      control: { type: 'select' },
    },
    btnType: {
      description: '按钮类型，可选值为:',
      table: {
        type: { summary: 'primary | default | link | danger' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      description: '设置禁用',
      options: [true, false],
      table: {
        defaultValue: { summary: 'false' },
      },
      control: { type: 'radio' },
    },
    href: {
      description: '`btnType`值为`link`时可设置的跳转地址',
    },
    style: {
      description: '自定义样式',
    },
    className: {
      description: '样式类名',
    },
    children: {
      description: '按钮内容',
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  children: 'Default',
  btnType: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  size: 'lg',
  children: 'Primary',
  btnType: 'primary',
};

export const Danger = Template.bind({});
Danger.args = {
  size: 'lg',
  children: 'Danger',
  btnType: 'danger',
};

export const Link = Template.bind({});
Link.args = {
  size: 'lg',
  children: 'Link',
  btnType: 'link',
  href: 'https://www.baidu.com/',
};
