import { Link } from 'remix';

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export function HeaderLinks(props: IHeaderNavProps): JSX.Element {
  const { userId, currentUrl, isNavVisible, title } = props;

  return isNavVisible ? (
    <span className="pagetop">
      <b className="hnname">
        <Link to="/">{title}</Link>
      </b>
      &nbsp;
      {userId && <Link to="/newswelcome">welcome</Link>}
      {userId && ' | '}
      <Link className={currentUrl === '/newest' ? 'topsel' : ''} to="/newest">
        new
      </Link>
      {userId && ' | '}
      {userId && (
        <Link className={currentUrl === '/threads' ? 'topsel' : ''} to={`/threads?id=${userId}`}>
          threads
        </Link>
      )}
      {' | '}
      <Link className={currentUrl === '/newcomments' ? 'topsel' : ''} to="/newcomments">
        comments
      </Link>
      {' | '}
      <Link className={currentUrl === '/show' ? 'topsel' : ''} to="/show">
        show
      </Link>
      {' | '}
      <Link className={currentUrl === '/ask' ? 'topsel' : ''} to="/ask">
        ask
      </Link>
      {' | '}
      <Link className={currentUrl === '/jobs' ? 'topsel' : ''} to="/jobs">
        jobs
      </Link>
      {' | '}
      <Link className={currentUrl === '/submit' ? 'topsel' : ''} to="/submit">
        submit
      </Link>
      {currentUrl === '/best' && ' | '}
      {currentUrl === '/best' && (
        <Link className="topsel" to="/best">
          best
        </Link>
      )}
    </span>
  ) : (
    <span className="pagetop">
      <b>{title}</b>
    </span>
  );
}
