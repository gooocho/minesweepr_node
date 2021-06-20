import { Rule } from "../types";

const BEGINNER: Rule = { width: 9, height: 9, mineCount: 10 };
const INTERMEDIATE: Rule = { width: 16, height: 16, mineCount: 40 };
const EXPERT: Rule = { width: 30, height: 16, mineCount: 99 };

export { BEGINNER, INTERMEDIATE, EXPERT };
