const { installGlobals } = require('@remix-run/node');

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

// Fail tests on any warning
// console.error = (message) => {
//   throw new Error(message);
// };
