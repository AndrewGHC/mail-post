import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './navbar';
import HeaderComponent from './header';
import {
  COLOUR_SECONDARY,
  COLOUR_WHITE,
} from '../constants';

const HEADER_HEIGHT = '10vh';
const NAV_WIDTH = '20vw';

const Wrapper = styled.section`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template:
      "nv hd" ${HEADER_HEIGHT}
      "nv mn" 1fr / minmax(200px, ${NAV_WIDTH}) 1fr;
`;
const Header = styled.header`
  background-color: ${COLOUR_WHITE};
  grid-area: hd;
`;
const Nav = styled.nav`
  background-color: ${COLOUR_SECONDARY};
  grid-area: nv;
`;
const Main = styled.main`
  background-color: ${COLOUR_WHITE};
  grid-area: mn;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Header>
      <HeaderComponent />
    </Header>

    <Nav>
      <Navbar />
    </Nav>

    <Main>
      {children}
    </Main>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
