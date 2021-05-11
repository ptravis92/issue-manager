import { ID } from "./ID";
import { Issue } from "./Issue";

export interface Project {
    _id: ID;
    projectIssues: Issue[];
}
