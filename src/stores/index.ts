import { atom } from "recoil";
import { IIssue } from "../types";

export const issueListState = atom<IIssue[] | []>({
  key: "#issueList",
  default: [],
});
