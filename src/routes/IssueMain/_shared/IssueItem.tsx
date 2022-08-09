import styled from "styled-components";
import { CircleIcon, ClosedIcon, CommentIcon } from "../../../assets";
import { IIssue } from "../../../types";
import { getDateString } from "../../../utils";

interface IProps {
  issue: IIssue;
  isOpenState: boolean;
}
const IssueItem = ({ issue, isOpenState }: IProps) => {
  const { title, comments, labels, number } = issue;

  return (
    <Wrapper>
      <TitleWrapper>
        <TitleSubWrapper>
          <IconWrapper>
            {isOpenState ? <CircleIcon width="1.2rem" fill="#1C7E37" /> : <ClosedIcon width="1.2rem" fill="#8250df" />}
          </IconWrapper>
          <Number>#{number}</Number>
          <Title>{title}</Title>
        </TitleSubWrapper>
        {labels.map((item) => (
          <Label color={item.color} key={item.id}>
            {item.name}
          </Label>
        ))}
      </TitleWrapper>
      <CategoryWrapper>
        <Date>{getDateString(issue.created_at)}</Date>
        <CommentIcon width="1.2rem" height="1.2rem" fill="#57606A" />
        <CommentCount>{comments}</CommentCount>
      </CategoryWrapper>
    </Wrapper>
  );
};

export default IssueItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #d0d7de;
  cursor: pointer;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;
`;

const TitleSubWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
`;

const Number = styled.p`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: #57606a;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  &:hover {
    color: #0969da;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div<{ color: string }>`
  padding: 0.3rem 0.7rem;
  margin-left: 0.5rem;
  border-radius: 1rem;
  color: white;
  background-color: ${(props) => `#${props.color}`};
`;

const CommentCount = styled.p`
  margin-left: 0.3rem;
  font-weight: 700;
  color: #57606a;
`;

const Date = styled.p`
  margin-right: 1rem;
`;
