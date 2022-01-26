import { Outlet } from 'remix';

import ycCss from '../../public/static/yc.css';

export const links = () => [{ rel: 'stylesheet', href: ycCss, type: 'text/css' }];

export default function () {
  return <Outlet />;
}
