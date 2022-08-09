import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getIssueList } from "../../api";
import { CheckIcon, CircleIcon, DownIcon } from "../../assets";
import { issueListState } from "../../stores";
import { IIssue } from "../../types";
import { SORT_LIST } from "../../utils";
import IssueItem from "./_shared/IssueItem";

const IssueMain = () => {
  const [issueList, setIssueList] = useRecoilState(issueListState);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenState, setIsOpenState] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortState, setSortState] = useState("Most commented");

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

  const handleOpenState = async (state: string, isOpen: boolean) => {
    const res = await getIssueList(1, state);
    setIssueList(res.data);
    setIsOpenState(isOpen);
  };

  const handleSortList = async (sort: string) => {
    const isOpen = isOpenState ? "open" : "closed";
    const getsortKeyword = (sortText: string) => {
      if (sortText === "Most commented") {
        return "comments";
      }
      if (sortText === "Newest") {
        return "created";
      }
      return "updated";
    };

    const res = await getIssueList(1, isOpen, getsortKeyword(sort));
    setIssueList(res.data);
    setSortState(sort);
  };

  return (
    <Wrapper>
      <FilteringWrapper>
        <IsOpenFilterWrapper>
          <OpenedFilter>
            <CircleIcon width="1.2rem" fill={isOpenState ? "#24292f" : "#57606a"} />
            <CountText isOpenState={isOpenState} onClick={() => handleOpenState("open", true)}>
              Open
            </CountText>
          </OpenedFilter>
          <ClosedFilter>
            <CheckIcon width="1.2rem" fill={!isOpenState ? "#24292f" : "#57606a"} />
            <CountText isOpenState={!isOpenState} onClick={() => handleOpenState("closed", false)}>
              Closed
            </CountText>
          </ClosedFilter>
        </IsOpenFilterWrapper>
        <SortWrapper>
          <SortFilter>Sort</SortFilter>
          <DownIcon width="0.7rem" />
        </SortWrapper>
        <SortModalWrapper>
          <SortHeaderWrapper>Sort by</SortHeaderWrapper>
          {SORT_LIST.map((item) => (
            <SortListWrapper key={item} onClick={() => handleSortList(item)}>
              <SortIconWrapper>{sortState === item && <CheckIcon width="1rem" />}</SortIconWrapper>
              <SortText>{item}</SortText>
            </SortListWrapper>
          ))}
        </SortModalWrapper>
      </FilteringWrapper>
      <IssueListWrapper ref={parentObservedTarget}>
        {issueList.map((item: IIssue) => (
          <IssueItem key={item.id} issue={item} isOpenState={isOpenState} />
        ))}
        <Target ref={setTarget}>{!isLoading && <p>loading...</p>}</Target>
      </IssueListWrapper>
    </Wrapper>
  );
};

export default IssueMain;

const Wrapper = styled.main`
  position: relative;
  margin: 2rem 0;
  width: 95%;
  max-width: 121rem;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`;

const FilteringWrapper = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  padding: 1rem 2rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #f6f8fa;
  height: 3.6rem;
  border-bottom: 1px solid #d0d7de;
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

const IssueListWrapper = styled.ul`
  margin-top: 3.6rem;
  height: 80vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;

const SortHeaderWrapper = styled.div`
  padding: 0.7rem 1.6rem;
  font-weight: 700;
`;

const SortIconWrapper = styled.div`
  width: 1.5rem;
`;

const SortFilter = styled.p`
  font-weight: 700;
  margin-right: 0.5rem;
`;

const SortModalWrapper = styled.div`
  width: 17rem;
  background-color: white;
  position: absolute;
  top: 3rem;
  right: 1rem;
  border: 0.5px solid #d0d7de;
  border-radius: 0.6rem;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
`;

const SortListWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1.6rem;
  border-top: 0.5px solid #d0d7de;
  align-items: center;
  cursor: pointer;
  height: 2.5rem;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const SortText = styled.p`
  font-weight: 600;
`;

const Target = styled.div``;
