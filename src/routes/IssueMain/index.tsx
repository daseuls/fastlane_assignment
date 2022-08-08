import styled from "styled-components";
import { CheckIcon, CircleIcon, CommentIcon } from "../../assets";

const IssueMain = () => {
  return (
    <Wrapper>
      <FilteringWrapper>
        <IsOpenFilterWrapper>
          <OpenedFilter>
            <CircleIcon width="1.2rem" fill="#57606a" />
            <CountText>1,393 Open</CountText>
          </OpenedFilter>
          <ClosedFilter>
            <CheckIcon width="1.2rem" fill="#57606a" />
            <CountText>6,411 Closed</CountText>
          </ClosedFilter>
        </IsOpenFilterWrapper>
      </FilteringWrapper>
      <IssueListWrapper>
        <IssueWrapper>
          <IssueTitleWrapper>
            <IssueIconWrapper>
              <CircleIcon width="1.2rem" fill="#1C7E37" />
              <IssueTitle>
                v5 used to include polyfills for node.js core modules by default issue: bug report
              </IssueTitle>
            </IssueIconWrapper>
            <IssueLabel>issue: proposal</IssueLabel>
            <IssueLabel>issue: proposal</IssueLabel>
            <IssueLabel>issue: proposal</IssueLabel>
          </IssueTitleWrapper>
          <IssueCategoryWrapper>
            <CommentIcon width="1.2rem" fill="#57606A" />
            <CommentCount>10</CommentCount>
          </IssueCategoryWrapper>
        </IssueWrapper>
      </IssueListWrapper>
    </Wrapper>
  );
};

export default IssueMain;

const Wrapper = styled.main`
  margin: 2rem 0;
  width: 95%;
  border: 1px solid #d0d7de;
  /* border-bottom: 0px;  */
  border-radius: 6px;
  max-width: 121rem;
`;

const FilteringWrapper = styled.section`
  padding: 1rem 2rem;
  background-color: #f6f8fa;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const IsOpenFilterWrapper = styled.div`
  display: flex;
`;

const OpenedFilter = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const ClosedFilter = styled.div`
  display: flex;
  align-items: center;
`;

const CountText = styled.p`
  margin-left: 0.5rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const IssueListWrapper = styled.ul``;

const IssueWrapper = styled.li`
  border-top: 1px solid #d0d7de;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const IssueTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
`;

const IssueIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IssueTitle = styled.p`
  font-size: 1.2rem;
  margin-left: 0.5rem;
  font-weight: 700;
`;

const IssueCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IssueLabel = styled.div`
  background-color: blue;
  border-radius: 1rem;
  color: white;
  padding: 0.3rem 0.7rem;
  margin-left: 0.5rem;
`;

const CommentCount = styled.p`
  color: #57606a;
  font-weight: 700;
  margin-left: 0.3rem;
`;
