import styled from "styled-components";
import { LogoIcon, BookmarkIcon, CircleIcon } from "../assets";

const Header = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoIcon width="2.5rem" hight="2.5rem" fill="white" />
        <Title>Issues</Title>
      </LogoWrapper>
      <IssueWrapper>
        <RepositoryWrapper>
          <BookmarkIcon width="1rem" fill="#57606A" />
          <User>facebook</User>
          <Slash>/</Slash>
          <Repository>create-react-app</Repository>
          <Label>Public</Label>
        </RepositoryWrapper>
        <CategoryWrapper>
          <CategorySubWrapper>
            <CircleIcon width="1.2rem" fill="#57606a" />
            <Category>Issues</Category>
          </CategorySubWrapper>
        </CategoryWrapper>
      </IssueWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
`;

const LogoWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 1.2rem 2.8rem;
  width: 100%;
  background-color: #24292f;
`;

const IssueWrapper = styled.section`
  border-bottom: 1px solid #d8dee4;
  background-color: #f6f8fa;
`;

const Title = styled.p`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
`;

const RepositoryWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 2.8rem;
`;

const User = styled.p`
  margin-left: 0.8rem;
  font-size: 1.6rem;
  color: #0969da;
  cursor: pointer;
`;

const Repository = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: #0969da;
`;

const Slash = styled.p`
  margin: 0 0.3rem;
  font-size: 1.6rem;
  color: #57606a;
`;

const Label = styled.div`
  padding: 0.3rem 0.7rem;
  margin-left: 1rem;
  font-weight: 600;
  border: 0.5px solid #d0d7de;
  border-radius: 1rem;
  color: #57606a;
`;

const CategoryWrapper = styled.div`
  display: flex;
`;

const CategorySubWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  margin: 0 2.8rem;
  border-bottom: 1.5px solid #fc8d73;
`;

const Category = styled.p`
  margin-left: 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
`;
