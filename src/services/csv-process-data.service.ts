import csv from 'csv-parser';
import fs from 'fs';
import { ICsvDataTypes } from '../interface/ICsvDataTypes';
import {
  convertRealCurrency,
  validateCpfOrCnpj,
  validateInstallments,
} from '../helpers/convertDataCsv.ts';

async function csvProcessDataService() {
  const csvFilePath = 'src/data-csv/data.csv';
  const formattedCsvFilePath = 'src/data-csv/convert_data.csv';

  const data: ICsvDataTypes[] = await new Promise((resolve, reject) => {
    const csvData: ICsvDataTypes[] = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (rowData: ICsvDataTypes) => {
        csvData.push(rowData);
      })
      .on('end', () => {
        resolve(csvData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  const processedData = data.map((register: ICsvDataTypes) => {
    register.vlTotal = convertRealCurrency(parseFloat(register.vlTotal));
    register.vlPresta = convertRealCurrency(parseFloat(register.vlPresta));
    register.vlMora = convertRealCurrency(parseFloat(register.vlMora));

    const isValidCpfOrCnpj = validateCpfOrCnpj(register.nrCpfCnpj);
    const isValidInstallments = validateInstallments(
      parseInt(register.vlTotal),
      parseInt(register.qtPrestacoes),
      parseInt(register.vlPresta),
    );

    return {
      ...register,
      isValidCpfOrCnpj: isValidCpfOrCnpj ? 'Sim' : 'Não',
      isValidInstallments: isValidInstallments ? 'Sim' : 'Não',
    };
  });

  const csvWriter = fs.createWriteStream(formattedCsvFilePath);
  csvWriter.write(
    'CPF/CNPJ,Valor Total,Valor Prestação,Valor Mora,CPF/CNPJ Válido,Prestações Válidas\n',
  );

  processedData.forEach((entry) => {
    csvWriter.write(
      `${entry.nrCpfCnpj},${entry.vlTotal},${entry.vlPresta},${entry.vlMora},${entry.isValidCpfOrCnpj},${entry.isValidInstallments}\n`,
    );
  });

  csvWriter.end();
  return processedData;
}

export default csvProcessDataService;
