import { renderToString } from 'react-dom/server';
import { HandleDocumentRequestFunction, RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import dotenv from 'dotenv';

dotenv.config();

export const handleRequest: HandleDocumentRequestFunction = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) => {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
};

export default handleRequest;
