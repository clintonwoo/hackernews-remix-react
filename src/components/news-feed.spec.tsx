/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { sampleData } from '../server/sample-data';
import { NewsFeed } from './news-feed';

MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  it('renders news items passed in as props', () => {
    const wrapper = render(
      <BrowserRouter>
        <NewsFeed stories={sampleData.newsItems} postsPerPage={30} pageNumber={1} />
      </BrowserRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
