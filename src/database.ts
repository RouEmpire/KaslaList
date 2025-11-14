import { Database } from "bun:sqlite";

const db = new Database("todo_db.sqlite", { create: true, strict: true });
db.run(`
  CREATE TABLE IF NOT EXSITS todolist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    
  )
`)


const insertQuery = db.query("INSERT 'Hello world' as message;");
