import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile  from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import AssignedLecturesView from './pages/AssignedLecturesView';
import AssignedLectures from './pages/AssignedLectures';
import LeaveRecordsView from './pages/LeaveRecordsView';
import LeaveRecordsEntry from './pages/LeaveRecords';
import CommitteeWorkView from './pages/CommitteeWorkView';
import CommitteeWorkEntry from './pages/Committees';
import ContributionsView from './pages/ContributionsView';
import Contributions from './pages/Contributions'; // Contributions Entry Page
import ParticipationView from './pages/ParticipationView'; // Participation View
import Participation from './pages/Participation'; // Participation Entry Page
import PublicationsView from './pages/ResearchPublicationsView'; // Publications View
import ResearchPublicationsView from './pages/ResearchPublicationsView'; // Research Publications View
import MOOCsView from './pages/MOOCsView'; // Import the MOOCs View
import TeachingPlan from './pages/TeachingPlan'; // Teaching Plan Entry Page
import TeachingPlanView from './pages/TeachingPlanView'; // Teaching Plan View Page
import SyllabusCompletionView from './pages/SyllabusCompletionView';
import SyllabusReport  from './pages/SyllabusReport';
import Synopsis from './pages/Synopsis';
import SynopsisView  from './pages/SynopsisView';
import ActivityReports from './pages/ActivityReports'; 
import ActivityReportsView from './pages/ActivityReportsView';
import CourseOutcome from './pages/CourseOutcome';
import CourseOutcomeView from './pages/CourseOutcomeView';
import CentralAssessment from './pages/CentralAssessment';
import CentralAssessmentView from './pages/CentralAssessmentView';
import LectureDetailsView from './pages/LectureDetailsView';
import LectureDetails from './pages/LectureDetails';
import './App.css';
import PublicationsEntry from './pages/Publications';
import ResearchProjects from './pages/ResearchProjects'; // Importing the missing ResearchProjects component
import MOOCsEntry from './pages/MOOCsContent'; // Import the MOOCs Entry Page
import Login from './pages/Login'; // Add import for Login Page
import axios from 'axios';


function App() {
  const [teachingPlanData, setTeachingPlanData] = useState([]);
  const [editTeachingPlanData, setEditTeachingPlanData] = useState(null);

  const [leaveRecords, setLeaveRecords] = useState([]);
  const [editLeaveRecord, setEditLeaveRecord] = useState(null);

  const [contributionsData, setContributionsData] = useState([]);
  const [editContributionData, setEditContributionData] = useState(null);

  const [participationData, setParticipationData] = useState([]);
  const [editParticipationData, setEditParticipationData] = useState(null);

  const [publicationsData, setPublicationsData] = useState([]);
  const [editPublicationData, setEditPublicationData] = useState(null);

  const [moocsData, setMoocsData] = useState([]);
  const [editMoocsData, setEditMoocsData] = useState(null);


  const [month, setMonth] = useState('January');
  const [year, setYear] = useState('2024');
  const [className, setClassName] = useState('FY');
  const [semester, setSemester] = useState('Semester 1');


  // State to handle if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [entry_id, setEntry_id] = useState(null);

 //localStorage.setItem('registeredUsers', JSON.stringify([{user: { email: 'admin', password: 'admin' }, 'isLoggedIn': false}]));

  useEffect(() => {
    const id = localStorage.getItem('id') ? localStorage.getItem('id') : false;
    if(id){
      axios.get(`http://localhost:5000/info/${id}`).then(res => {
        if(res.status === 200){
          setUser(res.data[0]);
          setIsLoggedIn(true);
        }
      }).catch(error => {
        console.log(error);
        localStorage.removeItem('id');
      });
    }
    
  }, [Navbar, Sidebar]);
  const handleSaveTeachingPlan = (newData) => {
    if (newData.id) {
      setTeachingPlanData(teachingPlanData.map((item) => (item.id === newData.id ? newData : item)));
    } else {
      newData.id = Date.now();
      setTeachingPlanData([...teachingPlanData, newData]);
    }
    setEditTeachingPlanData(null);
  };

  const handleDeleteTeachingPlan = (id) => {
    setTeachingPlanData(teachingPlanData.filter((item) => item.id !== id));
  };

  const handleEditTeachingPlan = (data) => {
    setEditTeachingPlanData(data);
  };

  const handleSaveData = (dataType, newData) => {
    const dataState = {
      leave: leaveRecords,
      contribution: contributionsData,
      participation: participationData,
      publication: publicationsData,
      mooc: moocsData,
    };

    const setDataState = {
      leave: setLeaveRecords,
      contribution: setContributionsData,
      participation: setParticipationData,
      publication: setPublicationsData,
      mooc: setMoocsData,
    };

    if (newData.id) {
      setDataState[dataType](dataState[dataType].map((item) => (item.id === newData.id ? newData : item)));
    } else {
      newData.id = Date.now();
      setDataState[dataType]([...dataState[dataType], newData]);
    }
  };

  const handleDeleteData = (dataType, id) => {
    const dataState = {
      leave: leaveRecords,
      contribution: contributionsData,
      participation: participationData,
      publication: publicationsData,
      mooc: moocsData,
    };

    const setDataState = {
      leave: setLeaveRecords,
      contribution: setContributionsData,
      participation: setParticipationData,
      publication: setPublicationsData,
      mooc: setMoocsData,
    };

    setDataState[dataType](dataState[dataType].filter((item) => item.id !== id));
  };

  const handleEditData = (dataType, data) => {
    switch (dataType) {
      case 'leave':
        setEditLeaveRecord(data);
        break;
      case 'contribution':
        setEditContributionData(data);
        break;
      case 'participation':
        setEditParticipationData(data);
        break;
      case 'publication':
        setEditPublicationData(data);
        break;
      case 'mooc':
        setEditMoocsData(data);
        break;
      default:
        break;
    }
  };

  
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar user={user}/>
          <Sidebar />
          <div style={{ marginLeft: 240, paddingTop: 64 }}> {/* Adjust the marginLeft based on sidebar width */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/Profile" element={<Profile/>} />
              {/* Assigned Lectures */}
              <Route path="/assigned-lectures-view" element={<AssignedLecturesView />} />
              <Route path="/assigned-lectures" element={<AssignedLectures />} />
              
              {/* Leave Records Routes */}
              <Route path="/leave-records-view" element={<LeaveRecordsView data={leaveRecords} onDelete={(id) => handleDeleteData('leave', id)} onEdit={(record) => handleEditData('leave', record)} />} />
              <Route path="/LeaveRecords" element={<LeaveRecordsEntry initialData={editLeaveRecord} onSave={(newRecord) => handleSaveData('leave', newRecord)} />} />
              
              {/* Committee Work Routes */}
              <Route path="/CommitteeWorkView" element={<CommitteeWorkView data={contributionsData} onDelete={(id) => handleDeleteData('contribution', id)} onEdit={(record) => handleEditData('contribution', record)} />} />
              <Route path="/Committees" element={<CommitteeWorkEntry onSave={(newData) => handleSaveData('contribution', newData)} />} />
              
              {/* Contributions Routes */}
              <Route path="/Contributions" element={<Contributions onSave={(newData) => handleSaveData('contribution', newData)} />} />
              <Route path="/ContributionsView" element={<ContributionsView data={contributionsData} onDelete={(id) => handleDeleteData('contribution', id)} onEdit={(data) => handleEditData('contribution', data)} />} />
              
              {/* Participation Routes */}
              <Route path="/Participation" element={<Participation onSave={(newData) => handleSaveData('participation', newData)} />} />
              <Route path="/ParticipationView" element={<ParticipationView data={participationData} onDelete={(id) => handleDeleteData('participation', id)} onEdit={(data) => handleEditData('participation', data)} />} />
              
              <Route path="/Publications" element={<PublicationsEntry onSave={(newData) => handleSaveData('publication', newData)} />} />
              <Route path="/PublicationsView" element={<PublicationsView data={publicationsData} onDelete={(id) => handleDeleteData('publication', id)} onEdit={(data) => handleEditData('publication', data)} />} />
                   
              {/* Research Publications Routes */}
              <Route path="/ResearchProjects" element={<ResearchProjects onSave={(newData) => handleSaveData('publication', newData)} />} />
              <Route path="/ResearchPublicationsView" element={<ResearchPublicationsView data={publicationsData} onDelete={(id) => handleDeleteData('publication', id)} onEdit={(data) => handleEditData('publication', data)} />} />
              
              {/* MOOCs Routes */}
              <Route path="/MOOCsContent" element={<MOOCsEntry onSave={(newData) => handleSaveData('mooc', newData)} />} />
              <Route path="/MOOCsView" element={<MOOCsView data={moocsData} onDelete={(id) => handleDeleteData('mooc', id)} onEdit={(data) => handleEditData('mooc', data)} />} />
              
              {/* Teaching Plan Routes */}
              <Route
                path="/TeachingPlan"
                element={
                  <TeachingPlan month={month} year={year} className={className} semester={semester}/>
                }
              />
              <Route
                path="/TeachingPlanView"
                element={
                  <TeachingPlanView
                    month={month}
                    year={year}
                    className={className}
                    semester={semester}
                    data={teachingPlanData}
                    setMonth={setMonth}
                    setYear={setYear}
                    setClassName={setClassName}
                    setSemester={setSemester}
                    onDelete={(id) => handleDeleteTeachingPlan(id)}
                    onEdit={(data) => handleEditTeachingPlan(data)}
                  />
                }
              /> 
              <Route path="/LectureDetails" element={<LectureDetails entry_id={entry_id} month={month} year={year} className={className}/>}/>
              <Route path="/LectureDetailsView" element={<LectureDetailsView entry_id={entry_id} setEntry_id={setEntry_id}/>} />
              <Route path="/SyllabusReport" element={<SyllabusReport />} />
              <Route path="/SyllabusCompletionView" element={<SyllabusCompletionView />} />
              <Route path="/SyllabusReport" element={<SyllabusReport />} />
              <Route path="/SynopsisView" element={<SynopsisView />} />
              <Route path="/Synopsis" element={<Synopsis />} />
              <Route path="/ActivityReports" element={<ActivityReports />} />
              <Route path="/ActivityReportsView" element={<ActivityReportsView />} />
              <Route path="/CourseOutcome" element={<CourseOutcome />} />
              <Route path="/CourseOutcomeView" element={<CourseOutcomeView />} />
              <Route path="/CentralAssessment" element={<CentralAssessment />} />
              <Route path="/CentralAssessmentView" element={<CentralAssessmentView />} />
            </Routes>
          </div> 
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login /> } />
          <Route path="/Register" element={<Register isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />} />
         
        </Routes>
      )}
    </Router> 
  );
} 

export default App;
