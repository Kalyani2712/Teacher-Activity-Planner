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
      phoneNo: "[1234567890, 9876543210]",
      res_address: "Some place, Some city, Some state, Some country",
      per_address: "Some place, Some city, Some state, Some country"
    }
  ]);
};
