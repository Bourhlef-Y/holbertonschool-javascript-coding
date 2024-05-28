const fs = require('fs');

function countStudents(path) {
    try {
        const data = fs.readFileSync(path, 'utf-8');
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
    } catch (error) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
