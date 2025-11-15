import {describe, expect, test} from "bun:test";

import TodoItem from "../src/type";

describe("Type class and it's object behavior", () => {
  test("Insert query correctness", () => {
  // setup
  const today = new Date();
  const testTodoItem = new TodoItem("Water plants", today)
  const expectResult: string = `('Water plants', ${today.getTime()}, 0, -1)`
  // verify
  expect(testTodoItem.SQLiteInsert).toBe(expectResult);
  })

test("Insert query correctness with description", () => {
  // setup
  const today = new Date();
  const testTodoItem =
      new TodoItem("Water plants", today, "water the plants near windows")
  const expectResult: string = `('Water plants', ${
      today.getTime()}, 0, -1, 'water the plants near windows')`
  // verify
  expect(testTodoItem.SQLiteInsert).toBe(expectResult);
})

test("Set Pre-requisite to NO.3", () => {
  // setup
  const today = new Date();
  const testTodoItem = new TodoItem("Water plants", today)
  const expectResult: string = `('Water plants', ${today.getTime()}, 0, 3)`
  // exercise
  testTodoItem.Prereq = 3;
  // verify
  expect(testTodoItem.SQLiteInsert).toBe(expectResult);
})

  test("as object getter (.itemAsObject)", () => {
  // setup
  const today = new Date();
  const testTodoItem =
      new TodoItem("Water plants", today, "water the plants near window")
  const expectResult = {
    title : "Water plants",
    description : "water the plants near window",
    beginDate : today.getTime(),
    finishDate : null,
    prereq : null,
    isFinish : false
  } // verify
                       expect(testTodoItem.itemAsObject)
                           .toMatchObject(expectResult);
  })
});
