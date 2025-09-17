const merge = (...args) => {
  // Variables
  let target = {};
  let deep = false;
  let i = 0;
  // Check if a deep merge
  if (typeof args[0] === "boolean") {
    deep = args[0];
    i++;
  }
  // Merge the object into the target object
  let merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
        ) {
          // If we're doing a deep merge
          // and the property is an object
          target[prop] = merge(target[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
        }
      }
    }
  };
  //Loop through each object and conduct a merge
  for (; i < args.length; i++) {
    merger(args[i]);
  }
  return target;
};

export const obj = {
  merge,
};
