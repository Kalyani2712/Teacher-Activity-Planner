const { json } = require("express");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').truncate()
  await knex('teachers').insert([
    {
      t_id: 1733062607989, 
      name: "John Sinha",
      email: "test123@example.com",
      password: "test123",
      designation: "Assistant Professor",
      qualification: "MSC, MCS",
      faculty: "Science",
      department: "Computer Science",
      DOB: "01/01/2000",
      phoneNo: "1234567890",
      res_address: "Some place, Some city, Some state, Some country",
      per_address: "Some place, Some city, Some state, Some country"
    }
  ]);

  await knex('teaching_plan').truncate()
  await knex('teaching_plan').insert([
    {
      t_id: 1733062607989,
      year: "2023",
      month: "January",
      semester: 'Semester 1',
      class: "FY",
      course: "Course 1",
      availablePeriod: '7',
      title: "Title 1",
      paperNo: 1,
      lectureDetails: JSON.stringify([
        {
          lecNo: "Lecture 1",
          topic: "Topic 1",
          subTopic: "Sub Topic 1",
          plannedDate: "2023-01-01",
          actualDate: "2023-01-01",
          remark: "completed"
        },
        {
          lecNo: "Lecture 2",
          topic: "Topic 2",
          subTopic: "Sub Topic 2",
          plannedDate: "2023-01-02",
          actualDate: "",
          remark: "pending"
        }
      ])
    }
  ]);

  await knex('lecture_taken').truncate()
  await knex('lecture_taken').insert([
    {
      t_id: 1733062607989,
      year: "2023",
      month: "January",
      date: "2023-01-01",
      div: "A",
      class: "FY",
      time: "9:00 AM - 10:00 AM",
      lecNo: "Lecture 1",
      title: "Title 1",
      module: "Module 1"
  }]);
};
