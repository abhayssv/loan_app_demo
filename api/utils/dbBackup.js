const moment = require('moment');
const mysqldump = require('mysqldump')
var fs = require("fs");

const c_Date = moment().format('YYYY_MM_DD');
const d_Date = moment().subtract(2, 'days').format('YYYY_MM_DD');

const dbBackup = () => {
    console.log(2222222222222222);
    const d_file = `${process.env.DB_NAME}_${d_Date}.sql`
    const fileName = `${process.env.DB_NAME}_${c_Date}.sql`
    mysqldump({
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        tables:['vizzve_apply_loan'],
        dumpToFile: `./uploads/database_Backup/${fileName}`,
        compressFile: true
    });
    fs.unlink(`./uploads/database_Backup/${d_file}`, (err) => {
    if (err) return
    console.log('file deleted successfully');
    })
}

module.exports = dbBackup