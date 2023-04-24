const XLSX = require('xlsx');

function readXLSXFile(filePath) {
  // Lee el archivo XLSX
  const workbook = XLSX.readFile(filePath);

  // Obtiene la primera hoja (sheet) del archivo
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convierte la hoja en un array de objetos
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  // Elimina la primera fila (nombres reales de las columnas)
  const keys = data[1];
  data.splice(0, 2);

  // Mapea las filas a objetos utilizando las keys de la segunda fila
  const result = data.map(row => {
    const obj = {};
    row.forEach((value, index) => {
      obj[keys[index]] = value;
    });
    return obj;
  });

  return result;
}

module.exports = {
    readXLSXFile
}