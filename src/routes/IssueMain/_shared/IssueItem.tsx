import styled from "styled-components";
import { CircleIcon, CommentIcon } from "../../../assets";
import { IIssue } from "../../../types";
import { getDateString } from "../../../utils";

interface IProps {
  issue: IIssue;
}
const IssueItem = ({ issue }: IProps) => {
  const { title, comments, labels, number } = issue;
  console.log(labels);
  return (
    <Wrapper>
      <TitleWrapper>
        <IconWrapper>
          <CircleIcon width="1.2rem" fill="#1C7E37" />
          <Number>#{number}</Number>
          <Title>{title}</Title>
        </IconWrapper>
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
  border-top: 1px solid #d0d7de;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.p`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: #57606a;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
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

const Date = styled.p``;
