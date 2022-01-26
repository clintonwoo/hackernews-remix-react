import { Link } from 'remix';
import { useContext } from 'react';

import { ICurrentLoggedInUser, MeContext } from '../utils/context';
import { useCurrentPathname } from '../utils/hooks';
import { HeaderLinks } from './header-links';

import y18Gif from '../../public/static/y18.gif';

export interface IHeaderProps {
  isNavVisible: boolean;
  title: string;
}

export function Header(props: IHeaderProps): JSX.Element {
  const { isNavVisible, title } = props;

  const currentUrl = useCurrentPathname();
  const me = useContext<ICurrentLoggedInUser | undefined>(MeContext);

  return (
    <tr>
      <td style={{ backgroundColor: '#ff6600', padding: '0px' }}>
        <table style={{ border: '0px', padding: '2px', borderSpacing: '0px', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '18px', padding: '0px', paddingRight: '4px' }}>
                <Link to="/">
                  <img
                    src={y18Gif}
                    style={{
                      border: '1px',
                      borderColor: 'white',
                      borderStyle: 'solid',
                      height: '18px',
                      width: '18px',
                    }}
                  />
                </Link>
              </td>
              <td style={{ lineHeight: '12px', height: '10px', padding: '0px' }}>
                <HeaderLinks currentUrl={currentUrl} isNavVisible={isNavVisible} title={title} />
              </td>
              <td style={{ textAlign: 'right', padding: '0px', paddingRight: '4px' }}>
                {me ? (
                  <span className="pagetop">
                    <Link to={`/user?id=${me.id}`}>{me.id}</Link>
                    {` (${me.karma}) | `}
                    <a
                      href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`}
                    >
                      logout
                    </a>
                  </span>
                ) : (
                  <span className="pagetop">
                    <Link to={`/login?goto=${currentUrl}`}>login</Link>
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
