import { rtrim } from './rules'
// 获取页面 id class tag 元素元素
// 未测试 慎重使用～～
export const vo$ = (selector: string, context?: Document) => {
    if (!selector) return undefined
    // 删除空格
    selector = selector.replace(rtrim, '$1')
    context = context || document
   
    const whitespace = "[\\x20\\t\\r\\n\\f]"
            
    const identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+"

    const runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" )

    const matchExpr = {
        ID: new RegExp("^#(" + identifier + ")"),
        CLASS: new RegExp("^\\.(" + identifier + ")"),
        TAG: new RegExp("^(" + identifier + "|[*])"),
    }


    const find = {
        ID: (id: string, context: Document) => {
            if (typeof context.getElementById !== "undefined") {
                var elem = context.getElementById(id);
                return elem ? [elem] : [];
            }
        },

        TAG: (tag: string, context: Document) => {
            if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);

                // DocumentFragment nodes don't have gEBTN
            } else {
                return context.querySelectorAll(tag);
            }
        },

        CLASS: (className: string, context: Document) => {
            if (typeof context.getElementsByClassName !== "undefined") {
                return context.getElementsByClassName(className);
            }
        }
    }

    // filters
    let type: string
    for (type in find) {
        if (matchExpr[type].exec(selector)) {
            break
        }
    }

    const findFn = find[type]
    if (findFn) {
        return findFn(selector, context || document.body)
    }
}