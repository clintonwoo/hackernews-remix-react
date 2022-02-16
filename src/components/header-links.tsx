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
      {userId && (
        <>
          <Link to="/newswelcome">welcome</Link>
          {' | '}
        </>
      )}
      <Link className={currentUrl === '/newest' ? 'topsel' : ''} prefetch="intent" to="/newest">
        new
      </Link>
      {userId && (
        <>
          {' | '}
          <Link
            className={currentUrl === '/threads' ? 'topsel' : ''}
            prefetch="intent"
            to={`/threads?id=${userId}`}
          >
            threads
          </Link>
        </>
      )}
      {' | '}
      <Link
        className={currentUrl === '/newcomments' ? 'topsel' : ''}
        prefetch="intent"
        to="/newcomments"
      >
        comments
      </Link>
      {' | '}
      <Link className={currentUrl === '/show' ? 'topsel' : ''} prefetch="intent" to="/show">
        show
      </Link>
      {' | '}
      <Link className={currentUrl === '/ask' ? 'topsel' : ''} prefetch="intent" to="/ask">
        ask
      </Link>
      {' | '}
      <Link className={currentUrl === '/jobs' ? 'topsel' : ''} prefetch="intent" to="/jobs">
        jobs
      </Link>
      {' | '}
      <Link className={currentUrl === '/submit' ? 'topsel' : ''} to="/submit">
        submit
      </Link>
      {currentUrl === '/best' && (
        <>
          {' | '}
          <Link className="topsel" prefetch="intent" to="/best">
            best
          </Link>
        </>
      )}
    </span>
  ) : (
    <span className="pagetop">
      <b>{title}</b>
    </span>
  );
}
