// Display the initial message
console.log("Welcome to Holberton School, what is your name?");

// Listen for user input
process.stdin.on('data', (data) => {
    const name = data.toString().trim();
    console.log(`Your name is: ${name}`);
    process.exit();
});

// When the process is about to exit, display the closing message
process.on('exit', () => {
    console.log("This important software is now closing");
});
