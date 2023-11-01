import styled from "styled-components";
import { ReactNode } from "react";

const Nav = styled.nav`
  width: 20vw;
  min-width: 200px;
  background-color: ${(props) => props.theme.navBgColor};
  height: 100%;
  position: fixed;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
`;

interface NavbarProps {
  children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Nav>
      <Header>
        <Title>{children}</Title>
      </Header>
    </Nav>
  );
};

export default Navbar;
