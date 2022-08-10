import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleIcon } from "../../assets";
import { IIssue, IIssueLabel } from "../../types";

interface LocationState {
  state: IIssue;
}

const IssueDetail = () => {
  const { state } = useLocation() as LocationState;
  const { title, comments, number, user, created_at } = state;
  console.log(state);
  return (
    <Wrapper>
      <TitleWrapper>
        <TitleSubWrapper>
          <Title>{title}</Title>
          <Number>#{number}</Number>
        </TitleSubWrapper>
        <TitleSubWrapper>
          <LabelWrapper>
            <CircleIcon width="1rem" fill="white" />
            <Label>Open</Label>
          </LabelWrapper>
          <UserWrapper>
            <User>{user.login}&nbsp;</User>
            <Text>
              opend this issue on {new Date(created_at).toDateString()} · {comments} comments
            </Text>
          </UserWrapper>
        </TitleSubWrapper>
      </TitleWrapper>
    </Wrapper>
  );
};

export default IssueDetail;

const Wrapper = styled.main`
  width: 95%;
  max-width: 121rem;
  /* background-color: yellow; */
`;

const TitleWrapper = styled.div`
  margin-top: 2.5rem;
`;

const TitleSubWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #2da44e;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
`;

const Label = styled.div`
  font-size: 1.2rem;
  margin-left: 0.2rem;
  color: white;
  top: 0.1rem;
  position: relative;
`;

const Title = styled.p`
  font-size: 2.3rem;
  font-weight: 600;
  color: #24292f;
`;

const Number = styled.p`
  font-size: 2.3rem;
  color: #57606a;
  margin-left: 0.5rem;
`;

const UserWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
  color: #57606a;
`;

const User = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
`;

const Text = styled.p``;
