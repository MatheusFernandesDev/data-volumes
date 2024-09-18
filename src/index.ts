import csvProcessDataService from './services/csv-process-data.service';

class ProcessController {
  async processCsvData() {
    try {
      const csvData = await csvProcessDataService();
      return csvData;
    } catch (error) {
      console.error(error);
    }
  }
}

const processController = new ProcessController();

processController.processCsvData();
