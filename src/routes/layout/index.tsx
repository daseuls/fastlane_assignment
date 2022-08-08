import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div``;
