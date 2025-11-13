const Database = require('better-sqlite3')
const db = new Database('shoeDatabase.db');

//must add if not exists otherwise every time you run it will create a new DB
db.prepare(
    `CREATE TABLE IF NOT EXISTS shoes( 
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    brand TEXT NOT NULL,
    size INTEGER NOT NULL,
    color TEXT NOT NULL,
    price REAL NOT NULL,
    acquired_date TEXT NOT NULL,
    sold_date TEXT,
    notes TEXT
    )`
).run()

module.exports = db