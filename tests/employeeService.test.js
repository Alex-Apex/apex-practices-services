const { fetchEmployees } = require('../services/employeeService');
const mssql = require('mssql');

// Mock the "poolPromise" from the "db" module
jest.mock('../db', () => {
  const request = {
    query: jest.fn(),
  };

  const pool = {
    request: jest.fn().mockReturnValue(request),
  };

  return {
    poolPromise: Promise.resolve(pool),
  };
});

const request = require('../db').poolPromise.then(pool => pool.request());

describe('fetchEmployees', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return employees when the database returns records', async () => {
    // Prepare a mocked database result
    const mockEmployees = [
      { id: 1, name: 'John Doe', seniorityLevel: 'senior' },
      { id: 2, name: 'Jane Doe', seniorityLevel: 'junior' },
    ];

    (await request).query.mockResolvedValue({ recordset: mockEmployees });

    // Call the function and check the result
    const employees = await fetchEmployees();
    expect(employees).toEqual(mockEmployees);
  });

  it('should throw an error when there is a problem fetching employees', async () => {
    const errorMessage = 'Error fetching employees';

    // Mock the mssql request to throw an error
    (await request).query.mockRejectedValue(new Error(errorMessage));

    // Call the function and check the error
    await expect(fetchEmployees()).rejects.toThrow(errorMessage);
  });
});
