function insecureFunction(password: string) {
  console.log(`Password: ${password}`);
}

function complexFunction() {
  let sum = 0;
  for (let i = 0; i < 10000; i++) {
      sum += i;
  }
  console.log(`Sum: ${sum}`);
}

function unusedVariable() {
  let x = 10; // This variable is unused
}

function vulnerableCode(userInput: string) {
  eval(userInput); // This is a security vulnerability
}

const hardcodedPassword = "password123"; // This is a security vulnerability

insecureFunction(hardcodedPassword);
complexFunction();
unusedVariable();
vulnerableCode("alert('Hello, world!')");
