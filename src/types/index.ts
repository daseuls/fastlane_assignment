export interface IIssue {
  id: number;
  comments: number;
  created_at: string;
  title: string;
  labels: IIssueLabel[];
}

export interface IIssueLabel {
  id: number;
  color: string;
  name: string;
}
