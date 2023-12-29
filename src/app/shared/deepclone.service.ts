import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeepcloneService {

  constructor() { }

  deepCopy(original: any) {
    // Check if the input is an object
    if (typeof original !== 'object' || original === null) {
      return original; // If not an object, return the original value
    }

    // Create a new object or array to store the copied values
    const copy: any = Array.isArray(original) ? [] : {};

    // Recursively copy each property or element
    for (const key in original) {
      if (original.hasOwnProperty(key)) {
        copy[key] = this.deepCopy(original[key]);
      }
    }

    return copy;
  }

  // // Example usage:
  // const originalArray = [
  //   { name: 'John', age: 30 },
  //   { name: 'Jane', age: 25 },
  // ];

  // const deepCopiedArray = deepCopy(originalArray);

  // // Modify the deep copied array without affecting the original
  // deepCopiedArray[0].age = 35;

  // console.log(originalArray); // [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
  // console.log(deepCopiedArray); // [{ name: 'John', age: 35 }, { name: 'Jane', age: 25 }]

}
