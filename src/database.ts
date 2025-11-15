import {Database} from "bun:sqlite";

const db = new Database("todo_db.sqlite", {create : true, strict : true});
const create_database = db.query(`
  CREATE TABLE IF NOT EXISTS todolist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    beginDate INTEGER NOT NULL,
    finishDate INTEGER DEFAULT 0,
    prereq INTEGER DEFAULT 0,
    isFinish INTEGER DEFAULT 0
  )`);
create_database.run();

const insertItemQuery = {
  allData : db.query(`
    INSERT INTO todolist (title, description, beginDate, finishDate, prereq, isFinish)
    VALUES ($title, $description, $beginDate, $finishDate, $prereq, $isFinish)
  `),
  minimal : db.query(`
    INSERT INTO todolist (title, description, beginDate)
    VALUES ($title, $description, $beginDate)
  `),
  minimalAndPrereq : db.query(`
    INSERT INTO todolist (title, description, beginDate, prereq)
    VALUES ($title, $description, $beginDate, $prereq)
  `)
}

function insertItem(itemTitle: string, itemDescription: string): void;
function insertItem(itemTitle: string, itemDescription: string,
                    itemPrereq: Number): void;
function insertItem(itemTitle: string, itemDescription: string,
                    itemPrereq?: Number): void {
  if (itemPrereq) {
    insertItemQuery.minimalAndPrereq.run({
      title : itemTitle,
      description : itemDescription,
      beginDate : new Date().getTime(),
      prereq : itemPrereq.valueOf(),
    })
  } else {
    insertItemQuery.minimal.run({
      title : itemTitle,
      description : itemDescription,
      beginDate : new Date().getTime()
    })
  }
}

insertItem("Water plants", "Water the winter plants", 14);
