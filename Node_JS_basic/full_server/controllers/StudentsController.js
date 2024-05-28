const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((result) => {
        let responseStr = 'This is the list of our students';
        Object.entries(result).forEach(([key, value]) => {
          responseStr += `\nNumber of students in ${key}: ${value.length}. List: ${value.join(', ')}`;
        });
        response.status(200).send(responseStr);
      })
      .catch((error) => { response.status(500).send(error.message); });
  }

  static getAllStudentsByMajor(request, response) {
    readDatabase(process.argv[2])
      .then((result) => {
        const { major } = request.params;
        if (Object.prototype.hasOwnProperty.call(result, major)) {
          response.status(200).send(`List: ${result[major].join(', ')}`);
        } else { response.status(500).send('Major parameter must be CS or SWE'); }
      })
      .catch((error) => { response.status(500).send(error.message); });
  }
}

module.exports = StudentsController;
