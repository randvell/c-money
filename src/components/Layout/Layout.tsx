import style from './Layout.module.scss';

import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

interface Props {
  centered?: boolean;
}

export const Layout: React.FC<Props> = ({centered = false}) => {
  return (
    <>
      <Header />
      <Main className={centered ? style.centered : ''}>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
