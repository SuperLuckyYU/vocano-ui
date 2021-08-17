// 匹配空格
export const whitespace = '[\\x20\\t\\r\\n\\f]';

// 左右空格
export const rtrim = new RegExp(`^${whitespace}+|((?:^|[^\\\\])(?:\\\\.)*)${whitespace}+$`, 'g');
