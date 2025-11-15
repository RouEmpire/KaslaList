class TodoItem {
  title: string;
  description: string|null;
  beginDate: Date;
  finishDate: Date|null;
  private prereq: number|null;
  isFinish: boolean;

  constructor(title: string, beginDate: Date);
  constructor(title: string, beginDate: Date, description: string);
  constructor(title: string, beginDate: Date, description?: string) {
    this.title = title;
    this.description = description ? description : null;
    this.beginDate = beginDate;
    this.finishDate = null;
    this.prereq = null;
    this.isFinish = false;
  }
  get SQLiteInsert(): string {
    let result: string = "";
    result += "(";
    result += `'${this.title}', `;
    result += this.beginDate.getTime() + ", ";
    result += this.isFinish ? 1 : 0 + ", ";
    result += this.prereq ? this.prereq : "-1";
    result += this.description ? `, '${this.description}'` : ""
    result += ")"
    return result;
  }
  get beginDateNum() { return this.beginDate.getTime(); }
  get finishDateNum() {
    if (this.finishDate === null) {
      return 0;
    }
    return this.finishDate.getTime();
  }
  get prereqNum() {
    if (this.prereq === null) {
      return 0;
    }
    return this.prereq;
  }
  set Finish(isFinish: boolean) { this.isFinish = isFinish; }
  set Prereq(prereqID: number|null) {
    if (prereqID == null) {
      this.prereq = -1;
    } else if (Number.isInteger(prereqID)) {
      this.prereq = prereqID;
    } else {
      console.error("Pre-requisite ID must be integer")
    }
  }
  get itemAsObject() {
    return {
      title: this.title, description: this.description,
          beginDate: this.beginDateNum,
          finishDate: this.finishDateNum === 0 ? null : this.finishDateNum,
          prereq: this.prereqNum === 0 ? null : this.prereqNum,
          isFinish: this.isFinish
    }
  }
}

export default TodoItem;
