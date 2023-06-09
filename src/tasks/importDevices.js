const {readXLSXFile} = require('./xlsx.utils')
const path = require('path');
const Database = require('../database');

const filePath = path.resolve(__dirname, './data/devices.xlsx');
let devices = readXLSXFile(filePath);

const dateKeys = Object.keys(devices[0]).filter((key)=> key.includes('date'))

devices = devices.map((device)=>{
    dateKeys.forEach((dateKey)=> device[dateKey] = new Date(device[dateKey]))
    device.supplier = {
        name : device.supplier_name?.toString().trim(),
        phone_number : device.supplier_phone_number?.toString().toString().trim(),
        mail : device.supplier_mail?.toString().trim(),
        address : device.supplier_address?.toString().trim(),    
    }
    device.support_supplier = {
        name : device.support_supplier_name?.toString().trim(),
        phone_number : device.support_supplier_phone_number?.toString().trim(),
        mail : device.support_supplier_mail?.toString().trim(),
        address : device.support_supplier_address?.toString().trim(),    
    }

    delete device.supplier_name; 
    delete device.supplier_phone_number; 
    delete device.supplier_mail;
    delete device.supplier_address;

    delete device.support_supplier_name; 
    delete device.support_supplier_phone_number; 
    delete device.support_supplier_mail;
    delete device.support_supplier_address;

    return device;
})

async function main(){
    const newDevices = await removeFoundRecordsFromObject(devices, 'device', 'deviceId');
    console.log("Nuevos dispositivos [deviceId]:", newDevices.map((device)=> device.deviceId))

    const suppliers = [...devices.filter((d)=> d.supplier.name).map((device)=> device.supplier), ...devices.filter((d)=> d.support_supplier.name).map((device)=> device.support_supplier)]
    if(suppliers.length){
        const newSuppliers = await removeFoundRecordsFromObject(suppliers, 'Supplier', 'name');
        await insertMultipleRecords(newSuppliers, 'Supplier')

        const supplierNames = suppliers.map((supplier)=> supplier.name)
        const sqlSelect = `SELECT id, name FROM Supplier WHERE name IN (?)`;
        const rows = await Database.query(sqlSelect, [supplierNames]);
        newDevices.map((newDevice)=>{
            newDevice.supplier = rows.find((row)=> row.name === newDevice.supplier.name).id
            newDevice.support_supplier = rows.find((row)=> row.name === newDevice.support_supplier.name).id
        })
    }

    const result = await insertMultipleRecords(newDevices, 'device')
    const allDevices = await Database.query('SELECT * FROM device');
    return result;
}

async function removeFoundRecordsFromObject(registers, table_name, identifier_field) {
    if(registers.length === 0) return []
    const registersObject = arrayToObject(registers,identifier_field)
    // Obtener los identificadores (ids) del objeto
    const ids = Object.keys(registersObject).map((id)=> isNaN(parseInt(id))? id : parseInt(id));

    // Consultar la tabla 'registers' basándose en los identificadores (ids)
    const sqlSelect = `SELECT * FROM ${table_name} WHERE ${identifier_field} IN (?)`;
    const rows = await Database.query(sqlSelect, [ids]);

    // Eliminar los registros encontrados del objeto inicial
    rows.forEach(row => delete registersObject[row[identifier_field]]);

    return Object.keys(registersObject).map((key)=>registersObject[key]);
}

function arrayToObject(array,identifier_field) {
    const result = {};
    
    array.forEach(item => {
      if (item[identifier_field]) result[item[identifier_field]] = item;
    });
  
    return result;
}

  // Función para insertar múltiples registros de objetos
async function insertMultipleRecords(registers, table_name) {
    if(registers.length === 0) return;
    const keys = Object.keys(registers[0]);
    const columnas = keys.join(', ');

    const sql = `INSERT INTO ${table_name} (${columnas}) VALUES ?`;
    const values = registers.map(registro => keys.map(key => registro[key]));

    try {
        return await Database.query(sql, [values]);
    } catch (error) {
        return error
    }
}

module.exports = {
    main
};
