import { Link } from 'remix';

import sGif from '../../public/static/s.gif';

export function Footer(): JSX.Element {
  return (
    <tr>
      <td style={{ padding: '0px' }}>
        <img alt="" src={sGif} height="10" width="0" />
        <table style={{ height: '2px', width: '100%', borderSpacing: '0px' }}>
          <tbody>
            <tr>
              <td style={{ backgroundColor: '#ff6600' }} />
            </tr>
          </tbody>
        </table>
        <br />
        <div style={{ textAlign: 'center' }}>
          <span className="yclinks">
            <a href="/newsguidelines">Guidelines</a>
            &nbsp;| <Link to="/newsfaq">FAQ</Link>
            &nbsp;| <a href="mailto:hn@ycombinator.com">Support</a>
            &nbsp;| <a href="https://github.com/HackerNews/API">API</a>
            &nbsp;| <Link to="/security">Security</Link>
            &nbsp;| <Link to="/lists">Lists</Link>
            &nbsp;| <Link to="/bookmarklet">Bookmarklet</Link>
            &nbsp;| <Link to="/dmca">DMCA</Link>
            &nbsp;| <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
            &nbsp;| <a href="mailto:hn@ycombinator.com">Contact</a>
          </span>
          <br />
          <br />
          <form method="get" action="//hn.algolia.com/" style={{ marginBottom: '1em' }}>
            Search:
            <input
              type="text"
              name="q"
              size={17}
              autoCorrect="off"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="false"
            />
          </form>
        </div>
      </td>
    </tr>
  );
}
