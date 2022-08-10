export interface IIssue {
  id: number;
  number: number;
  comments: number;
  created_at: string;
  title: string;
  labels: IIssueLabel[];
  user: IUser;
  state: string;
  body: string;
  reactions: IReaction;
}

export interface IIssueLabel {
  id: number;
  color: string;
  name: string;
}

export interface IUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IReaction {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}
