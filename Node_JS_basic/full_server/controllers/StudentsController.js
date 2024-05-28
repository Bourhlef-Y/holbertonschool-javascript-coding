import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2] || './database.csv')
      .then((studentsData) => {
        response.status(200).send('This is the list of our students\n'
        + `Number of students in CS: ${studentsData.CS.length}. List: ${studentsData.CS.join(', ')}\n`
        + `Number of students in SWE: ${studentsData.SWE.length}. List: ${studentsData.SWE.join(', ')}`);
      })
      .catch((error) => { response.status(500).send('Cannot load the database'); });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(process.argv[2] || './database.csv')
      .then((studentsData) => {
        response.status(200).send(`List: ${studentsData[major].join(', ')}`);
      })
      .catch((error) => { response.status(500).send(error.message); });
  }
}

export default StudentsController;
