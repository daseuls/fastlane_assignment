import styled from "styled-components";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <LoadingWrapper>
      <ReactLoading type="spin" color="#57606a" height={20} width={20} />
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
`;
