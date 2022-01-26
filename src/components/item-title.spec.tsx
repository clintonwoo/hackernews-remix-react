/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { sampleData } from '../server/sample-data';
import { ItemTitle } from './item-title';

MockDate.set(1506022129802);

describe('ItemTitle component', () => {
  it('renders news item properties passed in as props', () => {
    const wrapper = render(
      <BrowserRouter>
        <ItemTitle {...sampleData.newsItems[0]} isRankVisible={true} rank={1} />
      </BrowserRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
