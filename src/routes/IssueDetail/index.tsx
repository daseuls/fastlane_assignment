import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IIssue, IIssueLabel } from "../../types";

interface LocationState {
  state: IIssue;
}

const IssueDetail = () => {
  const { state } = useLocation() as LocationState;
  const { title, comments, number } = state;
  return <div>이슈 디테일</div>;
};

export default IssueDetail;
