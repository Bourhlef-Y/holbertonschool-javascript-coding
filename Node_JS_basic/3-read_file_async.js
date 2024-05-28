const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        // If there's an error, reject the promise with an error message
        reject(new Error('Cannot load the database'));
        return;
      }

      // Split data into lines, filter empty lines, skip the header line, map each line to an object
      const students = data.split('\n').filter(Boolean).slice(1).map((line) => {
        const [firstname, lastname, age, field] = line.split(',');
        return {
          firstname, lastname, age, field,
        };
      });

      // Create an object to store the students by field
      const studentsByField = {
        CS: [],
        SWE: [],
      };

      // Iterate over students and add them to the corresponding field in the studentsByField object
      students.forEach((student) => {
        if (studentsByField[student.field]) {
          studentsByField[student.field].push(student.firstname);
        }
      });

      // Print the total number of students
      console.log(`Number of students: ${students.length}`);

      // Print the number of students in CS and their names
      console.log(`Number of students in CS: ${studentsByField.CS.length || 0}. List: ${studentsByField.CS.join(', ')}`);

      // Print the number of students in SWE and their names
      console.log(`Number of students in SWE: ${studentsByField.SWE.length || 0}. List: ${studentsByField.SWE.join(', ')}`);

      // Create object with the total number of students and the number of students in each field
      const result = {
        totalNumber: `Number of students: ${students.length}`,
        CS: `Number of students in CS: ${studentsByField.CS.length || 0}. List: ${studentsByField.CS.join(', ')}`,
        SWE: `Number of students in SWE: ${studentsByField.SWE.length || 0}. List: ${studentsByField.SWE.join(', ')}`,
      };

      // Resolve the promise with the result object
      resolve(result);
    });
  });
}
module.exports = countStudents;
