module.exports = function check(str, bracketsConfig) {
  const stack = [], form = {}, type = {};

  for (let i = 0; i < bracketsConfig.length; i++) {
    let left = bracketsConfig[i][0];
    let right = bracketsConfig[i][1];
    form[left] = right;
    form[right] = left;
    type[left] = "opened";
    type[right] = "closed";
  }

  for (let i = 0; i < str.length; i++) {
    let top = stack.length <= 0 ? null : stack[stack.length - 1];
    let current = str[i];

    if (type[current] == "opened") {
      stack.push(current);
    }    
    else if (type[current] == "closed" && current !== form[current] && stack.length == 0) {
      return false;
    }
    else if (type[current] == "closed" && top !== form[current] && current !== form[current]) {
      return false;
    }
    else if (type[current] == "closed" && top == form[current]) {
      stack.pop();
    }
    else if (type[current] == "closed" && stack.length == 0 && current == form[current]) {
      stack.push(current);
    }
    else if (type[current] == "closed" && stack.length > 0 && top == form[current]) {
      stack.pop();
    }
    else if (type[current] == "closed" && stack.length > 0 && current == form[current]) {
      stack.push(current);
    }
  }

  return (stack.length == 0) ? true : false;
} 
