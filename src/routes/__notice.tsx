import { Outlet } from 'remix';

import ycCss from '../assets/yc.css';

export const links = () => [{ rel: 'stylesheet', href: ycCss, type: 'text/css' }];

export default function () {
  return <Outlet />;
}
