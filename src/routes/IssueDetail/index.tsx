import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CircleIcon, ClosedIcon } from "../../assets";
import { IIssue } from "../../types";
import { getReactions } from "../../utils";

interface LocationState {
  state: IIssue;
}

const IssueDetail = () => {
  const { state } = useLocation() as LocationState;
  const { title, comments, number, user, created_at, body, reactions } = state;
  const { login, avatar_url, html_url } = user;

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
            <User>{login}&nbsp;</User>
            <Text>
              opend this issue on {new Date(created_at).toDateString()} · {comments} comments
            </Text>
          </UserWrapper>
        </TitleSubWrapper>
      </TitleWrapper>
      <ContentsWrapper>
        <ProfileImg src={avatar_url} />
        <ContentsSubWrapper>
          <ContentsHeader>
            <User href={html_url} target="_blank">
              {login}&nbsp;
            </User>
            <Text>commented on {new Date(created_at).toDateString()}</Text>
          </ContentsHeader>
          <Contents>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </Contents>
          <ReactionWrapper>
            {getReactions(reactions).map((item) =>
              item[1] === 0 ? null : (
                <Reaction key={item[0]}>
                  {item[0]}&nbsp;&nbsp;
                  {item[1]}
                </Reaction>
              )
            )}
          </ReactionWrapper>
        </ContentsSubWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
};

export default IssueDetail;

const Wrapper = styled.main`
  width: 95%;
  max-width: 121rem;
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

const User = styled.a`
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
`;

const Text = styled.p``;

const ContentsWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  width: 100%;
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
  overflow: auto;
`;

const ContentsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid #d0d7de;
  font-size: 1.2rem;
  background-color: #f6f8fa;
`;

const Contents = styled.div`
  padding: 2rem;
`;

const ReactionWrapper = styled.div`
  display: flex;
  padding: 0 2rem 2rem;
`;

const Reaction = styled.div`
  border: 0.5px solid #d0d7de;
  padding: 0.5rem 0.7rem;
  border-radius: 1.2rem;
  color: #57606a;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #eaeef2;
  }
`;
