
export function isObject(value: unknown): Boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
}

export function isFunction(value: unknown): Boolean {
    return Object.prototype.toString.call(value) === '[object Function]'
}

export function isArray(value: unknown): Boolean {
    return Object.prototype.toString.call(value) === '[object Array]'
}

export function isString(value: unknown): Boolean {
    return Object.prototype.toString.call(value) === '[object String]'
}

export function isNumber(value: unknown): Boolean {
    return Object.prototype.toString.call(value) === '[object Number]'
}

function isPromise(value: any): Boolean {
  return !!value 
  	&& (typeof value === 'object' || typeof value === 'function')
  	&& typeof value.then === 'function';
}

export function classNames(...arg: any[]): string {
    if (!arg || arg.length === 0) return ''

    const basePrefixCls: string = 'vo'
    const names: string[] = []
    let prefixCls: string = ''
    let classNames: any[] = []

    if (isString(arg[0])) {
        if (arg.length === 1) {
          classNames = arg
        } else {
          [prefixCls, ...classNames] = arg
        }
    } else {
        classNames = arg
    }

    function addName(val: string) {
        const paths = [basePrefixCls, prefixCls, val === prefixCls ? '' : val]
        const className = paths.filter((v) => v !== '').join('-')
        names.push(className)
    }

    function getName(classNames: any[]) {
        for (let i = 0; i < classNames.length; i++) {
            const val = classNames[i]
            if (isString(val) || isNumber(val)) {
                addName(val)
            }
            if (isArray(val)) {
                getName(val)
            }
            if (isObject(val)) {
                for (const k in val) {
                    let v = val[k]
                    
                    if (isFunction(v)) {
                        v = v()
                    }
                    if (v === true) {
                      addName(k)
                    } else if (!!v || v === 0) {
                      addName(v)
                    }
                }
            }
            if (isFunction(val)) {
                addName(val)
            }
        }
    }

    getName(classNames)
    
    return names.join(' ')
}

