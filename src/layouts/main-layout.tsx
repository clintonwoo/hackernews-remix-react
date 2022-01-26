import * as React from 'react';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

interface IMainLayoutProps {
  children: React.ReactChild;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function MainLayout(props: IMainLayoutProps): JSX.Element {
  const { children, isNavVisible = true, isFooterVisible = true, title = 'Hacker News' } = props;

  return (
    <div>
      <table
        id="hnmain"
        style={{
          backgroundColor: '#f6f6ef',
          border: '0px',
          borderCollapse: 'collapse',
          borderSpacing: '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0px',
          width: '85%',
        }}
      >
        <tbody>
          <Header isNavVisible={!!isNavVisible} title={title!} />
          <tr style={{ height: '10px' }} />
          {children}
          {isFooterVisible && <Footer />}
        </tbody>
      </table>
    </div>
  );
}
