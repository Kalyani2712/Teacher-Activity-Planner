const server = require('./api/server');
const db = require('./sql/dbConfig');

const Hello = require('./api/hello');
const TeacherInfo = require('./api/teacherInfo');
const LectureData = require('./api/lectureData');
const LectureTaken = require('./api/lectureTaken');
const LeaveData = require('./api/leaveData');
const AssigneLectures = require('./api/assigneLect');

const port = 5000;
const hostname = 'http://localhost';

Hello(server);
TeacherInfo(server, db);
LectureData(server, db);
LectureTaken(server, db);
LeaveData(server, db);
AssigneLectures(server, db);

server.listen(port, () => {
    console.log(`Server running on port ${hostname}:${port}`);
});