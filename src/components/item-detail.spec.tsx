/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { sampleData } from '../server/sample-data';
import { ItemDetail } from './item-detail';

const newsItem = sampleData.newsItems[0];
// Snapshot will be out of date if we don't use consistent time ago
// newsItem.creationTime = new Date().valueOf();
MockDate.set(1506022129802);

describe('ItemDetail component', () => {
  it('renders news items passed in as props', () => {
    const wrapper = render(
      <BrowserRouter>
        <ItemDetail {...newsItem} isFavoriteVisible={false} />
      </BrowserRouter>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
