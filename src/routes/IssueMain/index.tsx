import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getIssueList } from "../../api";
import { CheckIcon, CircleIcon } from "../../assets";
import { issueListState } from "../../stores";
import { IIssue } from "../../types";
import IssueItem from "./_shared/IssueItem";

const IssueMain = () => {
  const [issueList, setIssueList] = useRecoilState(issueListState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getIssueList();
      setIssueList(res.data);
    };
    fetchData();
  }, [setIssueList]);

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
        {issueList.map((item: IIssue) => (
          <IssueItem issue={item} key={item.id} />
        ))}
      </IssueListWrapper>
    </Wrapper>
  );
};

export default IssueMain;

const Wrapper = styled.main`
  margin: 2rem 0;
  width: 95%;
  max-width: 121rem;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`;

const FilteringWrapper = styled.section`
  padding: 1rem 2rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #f6f8fa;
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
  font-size: 1.2rem;
  font-weight: 600;
`;

const IssueListWrapper = styled.ul``;
