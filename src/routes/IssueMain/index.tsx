import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getIssueList } from "../../api";
import { CheckIcon, CircleIcon } from "../../assets";
import { issueListState } from "../../stores";
import { IIssue } from "../../types";
import IssueItem from "./_shared/IssueItem";

const IssueMain = () => {
  const [issueList, setIssueList] = useRecoilState(issueListState);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenState, setIsOpenState] = useState(true);

  const parentObservedTarget = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getIssueList();
      setIssueList(res.data);
    };
    fetchData();
  }, [setIssueList]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(handleObserver, {
        root: parentObservedTarget.current,
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  const getMoreIssueList = useCallback(async () => {
    setIsLoading(true);
    const res = await getIssueList(page);
    if (res.data) {
      setIssueList([...issueList, ...res.data]);
      setIsLoading(false);
      setPage((prev) => prev + 1);
    }
  }, [issueList, page, setIssueList]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entry) => {
      if (entry[0].isIntersecting && !isLoading) {
        setTimeout(() => {
          getMoreIssueList();
        }, 3000);
      }
    },
    [getMoreIssueList, isLoading]
  );

  const handleOpenState = async (state: string) => {
    const res = await getIssueList(1, state);
    setIssueList(res.data);
    if (isOpenState) {
      setIsOpenState(false);
    } else {
      setIsOpenState(true);
    }
  };

  return (
    <Wrapper>
      <FilteringWrapper>
        <IsOpenFilterWrapper>
          <OpenedFilter>
            <CircleIcon width="1.2rem" fill={isOpenState ? "#24292f" : "#57606a"} />
            <CountText isOpenState={isOpenState} onClick={() => handleOpenState("open")}>
              1,393 Open
            </CountText>
          </OpenedFilter>
          <ClosedFilter>
            <CheckIcon width="1.2rem" fill={!isOpenState ? "#24292f" : "#57606a"} />
            <CountText isOpenState={!isOpenState} onClick={() => handleOpenState("closed")}>
              6,411 Closed
            </CountText>
          </ClosedFilter>
        </IsOpenFilterWrapper>
      </FilteringWrapper>
      <IssueListWrapper ref={parentObservedTarget}>
        {issueList.map((item: IIssue) => (
          <IssueItem key={item.id} issue={item} isOpenState={isOpenState} />
        ))}
        {/* <Target ref={setTarget}>{!isLoading && <p>loading...</p>}</Target> */}
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
  height: 80%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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

const CountText = styled.p<{ isOpenState: boolean }>`
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: ${(props) => (props.isOpenState ? "700" : "500")};
  color: ${(props) => (props.isOpenState ? "#24292f" : "#57606a")};
  cursor: pointer;
`;

const IssueListWrapper = styled.ul``;

const Target = styled.div``;
