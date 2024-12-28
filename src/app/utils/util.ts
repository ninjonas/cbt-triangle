export function printObjectProperties(obj: any, indent: string = ''): string {
    let result = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          result += `${indent}${key}: {\n${printObjectProperties(value, indent + '  ')}${indent}}\n`;
        } else {
          result += `${indent}${key}: ${value}\n`;
        }
      }
    }
    return result;
  }