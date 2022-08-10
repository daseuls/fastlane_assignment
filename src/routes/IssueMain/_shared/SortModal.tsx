import React, { Dispatch, useEffect, useRef } from "react";
import styled from "styled-components";
import {} from "../../../utils";
import { CheckIcon, CloseIcon } from "../../../assets";
import { SORT_LIST } from "../../../constants";

interface IProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  handleSortList: (sort: string) => void;
  sortState: string;
}

const SortModal = ({ isOpenModal, setIsOpenModal, handleSortList, sortState }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleModalClose = (e: any) => {
      if (isOpenModal && !modalRef.current?.contains(e.target)) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleModalClose);

    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, [isOpenModal, setIsOpenModal]);

  return (
    <SortModalWrapper ref={modalRef}>
      <SortHeaderWrapper>
        <SortHeaderText>Sort by</SortHeaderText>
        <CloseIcon width="0.6rem" fill="#57606a" onClick={() => setIsOpenModal(false)} />
      </SortHeaderWrapper>
      {SORT_LIST.map((item) => (
        <SortListWrapper key={item} onClick={() => handleSortList(item)}>
          <SortIconWrapper>{sortState === item && <CheckIcon width="1rem" />}</SortIconWrapper>
          <SortText>{item}</SortText>
        </SortListWrapper>
      ))}
    </SortModalWrapper>
  );
};

export default SortModal;

const SortHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.6rem;
  font-weight: 700;
`;

const SortHeaderText = styled.p``;

const SortIconWrapper = styled.div`
  width: 1.5rem;
`;

const SortModalWrapper = styled.div`
  position: absolute;
  top: 3rem;
  right: 1rem;
  width: 17rem;
  border: 0.5px solid #d0d7de;
  border-radius: 0.6rem;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
  background-color: white;
`;

const SortListWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem 1.6rem;
  border-top: 0.5px solid #d0d7de;
  cursor: pointer;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const SortText = styled.p`
  font-weight: 600;
`;
