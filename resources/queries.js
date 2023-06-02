const queries = {
  GET_ALL_EMPLOYEES: `SELECT * FROM Employees`,
  GET_ALL_ACTIVE_EMPLOYEES: `SELECT * FROM [dbo].[Employees] WHERE (company_end_date IS NULL OR company_end_date >= GETDATE())`,
  GET_BENCH_REPORT: `SELECT * FROM [dbo].[BENCHMANAGEMENT] ORDER BY Practice`,
  GET_ALL_SKILLS: `SELECT * FROM [dbo].[Skills]`,
  GET_ALL_PROJECTS: `SELECT * FROM [dbo].[Projects]`,
  GET_FRIDAY_CHAMPIONS: `SELECT * FROM [dbo].[ChampionsFriday]`,
  GET_FRIDAY_CHAMPIONS_LEADERBOARD: `SELECT * FROM [dbo].[ChampionsFridayLeaderboard]`,
  GET_EMPLOYEE_MANAGEMENT_EVENTS: `SELECT * FROM [dbo].[PerformanceEventTypes]`,
  GET_ORGS_EMPLOYEES:`WITH EmployeeHierarchy AS
  (
      SELECT
          id,
          name,
          supervisor_id
      FROM
          EMPLOYEES
      WHERE
          id = 2  -- the Id of the director you're starting from
  
      UNION ALL
  
      SELECT
          E.id,
          E.name,
          E.supervisor_id
      FROM
          EMPLOYEES E
      INNER JOIN EmployeeHierarchy EH ON E.supervisor_id = EH.id
  )
  SELECT * FROM EmployeeHierarchy;`,
  // Add more queries here
};

module.exports = queries;
