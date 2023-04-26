const queries = {
  GET_ALL_EMPLOYEES: `SELECT * FROM Employees`,
  GET_BENCH_REPORT: `SELECT TOP (1000) [Practice]
                            ,[EmpID]
                            ,[UserName]
                            ,[Name]
                            ,[Status]
                            ,[OnBenchSince]
                        FROM [dbo].[BENCHMANAGEMENT]`,
  // Add more queries here
};

module.exports = queries;
