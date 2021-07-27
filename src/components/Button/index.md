---
nav:
  title: 组件
  path: /components
---

## 介绍

> 按钮用于触发一个操作，如提交表单。

## 引入

```tsx | pure
import React from 'react';
import { Button } from 'vocano-ui';
```

代码演示:

```tsx
import React from 'react';
import { Button } from 'vocano-ui';

export default () => {
  return (
    <>
      <p>
        <Button size="lg" btnType="default">
          Default
        </Button>
        <Button disabled size="lg" btnType="default">
          Default Disabled
        </Button>
      </p>
      <p>
        <Button size="lg" btnType="primary">
          Primary
        </Button>
        <Button disabled size="lg" btnType="primary">
          Primary Disabled
        </Button>
      </p>
      <p>
        <Button size="lg" btnType="danger">
          Danger
        </Button>
        <Button disabled size="lg" btnType="danger">
          Danger Disabled
        </Button>
      </p>
      <p>
        <Button size="lg" btnType="link" href="https://www.yidianzixun.com/">
          Link
        </Button>
        <Button disabled size="lg" btnType="link" href="https://www.yidianzixun.com/">
          Link Disabled
        </Button>
      </p>
    </>
  );
};
```

<API src="/index.tsx" exports='["default"]'></API>
