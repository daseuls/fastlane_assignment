import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { getIssueList } from "../../api";
import { getSortKeyword } from "../../utils";
import { issueListState } from "../../stores";
import { IIssue } from "../../types";
import { CheckIcon, CircleIcon, DownIcon } from "../../assets";
import Loading from "../../components/Loading";
import IssueItem from "./_shared/IssueItem";
import SortModal from "./_shared/SortModal";

const IssueMain = () => {
  const [issueList, setIssueList] = useRecoilState(issueListState);

  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenState, setIsOpenState] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortState, setSortState] = useState("Most commented");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const parentObservedTarget = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getIssueList();
      setIssueList(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(handleObserver, {
        root: parentObservedTarget.current,
        threshold: 0.8,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  const getMoreIssueList = useCallback(async () => {
    const isOpen = isOpenState ? "open" : "closed";
    setIsLoading(true);
    const res = await getIssueList(page, isOpen, getSortKeyword(sortState));
    if (res.data) {
      setIssueList([...issueList, ...res.data]);
      setIsLoading(false);
      setPage((prev) => prev + 1);
    }
  }, [isOpenState, issueList, page, setIssueList, sortState]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entry) => {
      if (entry[0].isIntersecting && !isLoading) {
        setTimeout(() => {
          getMoreIssueList();
        }, 1000);
      }
    },
    [getMoreIssueList, isLoading]
  );

  const handleOpenState = async (state: string, isOpen: boolean) => {
    const res = await getIssueList(1, state, getSortKeyword(sortState));
    setPage(2);
    setIssueList(res.data);
    setIsOpenState(isOpen);
  };

  const handleSortList = async (sort: string) => {
    const isOpen = isOpenState ? "open" : "closed";
    const res = await getIssueList(1, isOpen, getSortKeyword(sort));
    setIssueList(res.data);
    setSortState(sort);
    setPage(2);
    setIsOpenModal(false);
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
        <SortWrapper onClick={() => setIsOpenModal((prev) => !prev)}>
          <SortFilter>Sort</SortFilter>
          <DownIcon width="0.7rem" />
        </SortWrapper>
        {isOpenModal && (
          <SortModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            handleSortList={handleSortList}
            sortState={sortState}
          />
        )}
      </FilteringWrapper>
      <IssueListWrapper ref={parentObservedTarget}>
        {issueList.map((item: IIssue) => (
          <IssueItem key={item.id} issue={item} isOpenState={isOpenState} />
        ))}
        <Target ref={setTarget}>{!isLoading && <Loading />}</Target>
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
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.6rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #d0d7de;
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

const IssueListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  margin-top: 3.6rem;
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

const SortFilter = styled.p`
  margin-right: 0.5rem;
  font-weight: 700;
`;

const Target = styled.div``;
