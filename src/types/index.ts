export interface IIssue {
  id: number;
  number: number;
  comments: number;
  created_at: string;
  title: string;
  labels: IIssueLabel[];
  user: IUser;
  state: string;
}

export interface IIssueLabel {
  id: number;
  color: string;
  name: string;
}

export interface IUser {
  login: string;
  avatar_url: string;
}
