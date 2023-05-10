const queries = {
  GET_ALL_EMPLOYEES: `SELECT * FROM Employees`,
  GET_BENCH_REPORT: `SELECT * FROM [dbo].[BENCHMANAGEMENT]`,
  GET_ALL_SKILLS: `SELECT * FROM [dbo].[Skills]`,
  GET_ALL_PROJECTS: `SELECT * FROM [dbo].[Projects]`,
  // Add more queries here
};

module.exports = queries;
