import { GoRecord } from './goban';
import { IIntersection } from './impl/intersection';

export function copyRecord(record: GoRecord): GoRecord {
  return deepCopy(record);
}

function deepCopy(object: any): any {
  if (object instanceof IIntersection) {
    return object;
  } else if (object === undefined) {
    return undefined;
  } else if (object === null) {
    return object;
  } else if (typeof object === 'number' || typeof object === 'string' || typeof object === 'boolean') {
    return object;
  } else if (typeof object === 'object') {
    if (Array.isArray(object)) {
      return object.map((value) => deepCopy(value));
    } else {
      const newObject: any = {};
      for (const key of Object.keys(object)) {
        newObject[key] = deepCopy(object[key]);
      }
      return newObject;
    }
  }
}