import { TouchEvent } from 'react';

export function isObject(value: unknown): Boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isFunction(value: unknown): Boolean {
  return Object.prototype.toString.call(value) === '[object Function]';
}

export function isArray(value: unknown): Boolean {
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function isString(value: unknown): Boolean {
  return typeof value === 'string';
}

export function isNumber(value: any): Boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isPromise(value: any): Boolean {
  return (
    !!value &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof value.then === 'function'
  );
}

export function uid(): string {
  function S4() {
    return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
  }

  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

/**
 * Make all properties in T optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export function classNames(...arg: (string | {})[]): string {
  if (!arg || arg.length === 0) return '';

  const basePrefixCls: string = 'vo';
  const names: string[] = [];
  let prefixCls: string = '';
  let classNameList: any[] = [];

  if (typeof arg[0] === 'string') {
    if (arg.length === 1) {
      classNameList = arg;
    } else {
      [prefixCls, ...classNameList] = arg;
    }
  } else {
    classNameList = arg;
  }

  function addName(val: string) {
    const paths = [basePrefixCls, prefixCls, val === prefixCls ? '' : val];
    const className = paths.filter(v => v !== '').join('-');
    names.push(className);
  }

  function getName(value: any[]) {
    for (let i = 0; i < value.length; i++) {
      const val = value[i];

      if (isString(val) || isNumber(val)) {
        addName(val);
      }

      if (isArray(val)) {
        getName(val);
      }

      if (isObject(val)) {
        type namesType = string | number | (() => void) | boolean;
        const valueList: namesType[] = Object.values(val);
        const keyList: string[] = Object.keys(val);
        for (let j = 0; j < valueList.length; j++) {
          let valueItem = valueList[j];
          if (isFunction(valueItem)) {
            valueItem = (valueItem as () => string)();
          }
          if (valueItem === true) {
            addName(keyList[j]);
          } else if (!!valueItem || valueItem === 0) {
            if (keyList[j] === 'customClassName') {
              names.push(valueItem as string);
              return;
            }
            addName(valueItem as string);
          }
        }
      }

      if (isFunction(val)) {
        addName(val);
      }
    }
  }

  getName(classNameList);

  return names.join(' ');
}

export const inBrowser = typeof window !== 'undefined';

// const root = (inBrowser ? window : global) as Window;

// let prev = Date.now();

// function rafPolyfill(fn: FrameRequestCallback): number {
//   const curr = Date.now();
//   const ms = Math.max(0, 16 - (curr - prev));
//   const id = setTimeout(fn, ms);
//   prev = curr + ms;
//   return id;
// }

// export function raf(fn: FrameRequestCallback): number {
//   const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
//   return requestAnimationFrame.call(root, fn);
// }

// // double raf for animation
// export function doubleRaf(fn: FrameRequestCallback): void {
//   raf(() => raf(fn));
// }

export function stopPropagation(event: TouchEvent) {
  event.stopPropagation();
}

export function preventDefault(event: TouchEvent, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

/** clamps number within the inclusive lower and upper bounds */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
export const plus0 = (value: number) => {
  if (value > 10) {
    return `${value}`;
  }
  return `0${value}`;
};

export const formatTimestamp = (() => {
  let result: string = '';
  return function format(time: number) {
    if (time < 3600) {
      result += `${plus0(Math.floor(time / 60))}:${plus0(time % 60)}`;
    } else {
      const hour = Math.floor(time / 3600);
      result = `${plus0(hour)}:`;
      format(time - 3600 * hour);
    }
    return result;
  };
})();
