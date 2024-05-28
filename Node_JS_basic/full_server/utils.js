const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line.trim() !== '');
      const header = lines[0].split(',');

      const students = lines.slice(1).map((line) => {
        const values = line.split(',');
        return {
          firstname: values[header.indexOf('firstname')],
          field: values[header.indexOf('field')],
        };
      });

      const fieldCounts = {};
      students.forEach((student) => {
        if (fieldCounts[student.field] === undefined) {
          fieldCounts[student.field] = [];
        }
        fieldCounts[student.field].push(student.firstname);
      });

      resolve(fieldCounts);
    });
  });
}

module.exports = readDatabase;
