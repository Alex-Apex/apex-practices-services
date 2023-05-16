const queries = {
  GET_ALL_EMPLOYEES: `SELECT * FROM Employees`,
  GET_ALL_ACTIVE_EMPLOYEES: `SELECT * FROM [dbo].[Employees] WHERE (company_end_date IS NULL OR company_end_date >= GETDATE())`,
  GET_BENCH_REPORT: `SELECT * FROM [dbo].[BENCHMANAGEMENT] ORDER BY Practice`,
  GET_ALL_SKILLS: `SELECT * FROM [dbo].[Skills]`,
  GET_ALL_PROJECTS: `SELECT * FROM [dbo].[Projects]`,
  // Add more queries here
};

module.exports = queries;
