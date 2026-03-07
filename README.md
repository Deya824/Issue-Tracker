

1️⃣ What is the difference between var, let, and const?
Ans:
/var: var is function-scoped and hoisted. It is moved to the top of its scope before code runs which leads to unexpected bugs.
/let: let is block-scoped and can be reassigned.
/const: const is also block-scoped but can't be reassigned after declaration.
2️⃣ What is the spread operator (...)?
Ans:
/The spread operator is a feature of JavaScript introduced with ES6 that gives you access to the insides of an iterable object. It unpacks elements from an array or object and spreads them individually.
Ex:
const a = [1, 2, 3];
const b = [...a, 4, 5];

3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:
/forEach — It just loops, returns nothing. We use it for side effects like DOM updates.
/map —It transforms each item and returns a new array of the same length.

/filter — keeps only items that pass a condition and returns a shorter array.

4️⃣ What is an arrow function?
Ans:
/A shorter way to write functions. Regular functions create their own this context. Arrow functions don't need to create this they inherit this from the surrounding scope.

Example:

function add(a, b) { return a + b; }

const add = (a, b) => a + b;

5️⃣ What are template literals?
Ans:
/Strings wrapped in backticks that allow embedded expressions and multi-line text. Anything inside ${} is evaluated as JavaScript. It handles line breaks naturally.

Example:

const msg = `Hello ${name}, you have ${count} messages.`;

