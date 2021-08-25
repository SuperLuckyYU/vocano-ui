
import React from 'react';
import { Button } from 'vocano-ui';
import '../../src/styles/index.scss';

export default () => (
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
      <p>
        <Button size="sm" btnType="default">
          Small Size
        </Button>
      </p>
    </>
  );
