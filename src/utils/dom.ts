import { rtrim } from './rules';

// 获取页面 id class tag 元素元素
// 未测试 慎重使用～～
const vo$ = (selector: string, context?: Document) => {
  if (!selector) return undefined;
  // 删除空格
  selector = selector.replace(rtrim, '$1');
  context = context || document;

  const whitespace = '[\\x20\\t\\r\\n\\f]';

  const identifier = `(?:\\\\[\\da-fA-F]{1,6}${whitespace}?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+`;

  const matchExpr = {
    ID: new RegExp(`^#(${identifier})`),
    CLASS: new RegExp(`^\\.(${identifier})`),
    TAG: new RegExp(`^(${identifier}|[*])`),
  };

  const find = {
    ID: (id: string, chilContext: Document) => {
      if (typeof chilContext.getElementById !== 'undefined') {
        const elem = chilContext.getElementById(id);
        return elem ? [elem] : [];
      }
    },

    TAG: (tag: string, chilContext: Document) => {
      if (typeof chilContext.getElementsByTagName !== 'undefined') {
        return chilContext.getElementsByTagName(tag);
        // DocumentFragment nodes don't have gEBTN
      }
      return chilContext.querySelectorAll(tag);
    },

    CLASS: (className: string, chilContext: Document) => {
      if (typeof chilContext.getElementsByClassName !== 'undefined') {
        return chilContext.getElementsByClassName(className);
      }
    },
  };

  // filters
  let type: string = '';
  const findKeys = Object.keys(find);
  for (let index = 0; index < findKeys.length; index++) {
    type = findKeys[index];
    if (matchExpr[type as keyof typeof matchExpr].exec(selector)) {
      break;
    }
  }

  const findFn = find[type as keyof typeof find];
  if (findFn) {
    return findFn(selector, context);
  }
};

export default vo$;
