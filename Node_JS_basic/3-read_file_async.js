const fs = require('fs');

function countStudents(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error('Cannot load the database'));
                return;
            }

            const lines = data.split('\n').filter(line => line.trim() !== '');

            const students = lines.slice(1).map(line => line.split(',')).filter(fields => fields.length === 4);
            const numberOfStudents = students.length;

            console.log(`Number of students: ${numberOfStudents}`);

            const fields = {};

            students.forEach(student => {
                const field = student[3];
                const firstName = student[0];
                if (!fields[field]) {
                    fields[field] = [];
                }
                fields[field].push(firstName);
            });

            for (const [field, names] of Object.entries(fields)) {
                console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            }

            resolve();
        });
    });
}

module.exports = countStudents;
