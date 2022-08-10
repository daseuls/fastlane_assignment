import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleIcon, ClosedIcon } from "../../assets";
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
          <LabelWrapper state={state.state === "open"}>
            {state.state === "open" ? (
              <CircleIcon width="1rem" fill="white" />
            ) : (
              <ClosedIcon width="1rem" fill="white" />
            )}
            <Label>{state.state === "open" ? "Open" : "Closed"}</Label>
          </LabelWrapper>
          <UserWrapper>
            <User>{user.login}&nbsp;</User>
            <Text>
              opend this issue on {new Date(created_at).toDateString()} · {comments} comments
            </Text>
          </UserWrapper>
        </TitleSubWrapper>
      </TitleWrapper>
      <ContentsWrapper>
        <ProfileImg src={user.avatar_url} />
        <ContentsSubWrapper>
          <ContentsHeader>
            {user.login} commented on {new Date(created_at).toDateString()}
          </ContentsHeader>
        </ContentsSubWrapper>
      </ContentsWrapper>
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
  padding: 1.5rem 0;
  border-bottom: 0.5px solid #d0d7de;
`;

const TitleSubWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const LabelWrapper = styled.div<{ state: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.state ? "#2da44e" : "#8250df")};
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

const ContentsWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  /* background-color: yellow; */
`;

const ProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.5px solid #d0d7de;
  margin-right: 1rem;
`;

const ContentsSubWrapper = styled.div`
  border: 1px solid #d0d7de;
  width: 100%;
  border-radius: 0.6rem;
`;

const ContentsHeader = styled.div`
  padding: 1rem 1.5rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid #d0d7de;
  font-size: 1.2rem;
  background-color: #f6f8fa;
`;
