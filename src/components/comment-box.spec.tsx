/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { sampleData } from '../server/sample-data';
import { CommentBox } from './comment-box';

describe('CommentBox component', () => {
  it('renders at different indentation levels', () => {
    const wrapper = render(
      <BrowserRouter>
        <CommentBox {...sampleData.topStoriesCache[0].comments[0]} />
      </BrowserRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
