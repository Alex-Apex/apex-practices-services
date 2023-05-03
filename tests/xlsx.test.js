const {getLocalBenchReport} = require('../services/toolsServices');

//const benchReportUrl ='https://apx365.sharepoint.com/:x:/s/ResourceManagementTeamShare/ETcy6iM3L3BHvJiDrn075wEB-Z8fylfpxHG80yB0zzyfIg?email=agomez%40apexsystems.com&e=yiKITL'
const LOCAL_PATH_TO_BENCH_REPORT = '/Users/alejandrogomez/Downloads/CS Bench Report.xlsx';

describe('Testing XL', () => {
  it('should find the second tab is the MDC one', async() => {
    // TODO: For the future let's grab the file off of sharepoint
    //const benchReport = await getRemoteBenchReport(benchReportUrl);
    const benchReport = await getLocalBenchReport(LOCAL_PATH_TO_BENCH_REPORT);    
    expect(benchReport).toBeInstanceOf(Object);
    //TODO: Add more tests
  });
});
