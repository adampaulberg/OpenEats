import React from 'react';
import SearchBar from '../components/SearchBar';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('Loading component test', () => {
  const component = createComponentWithIntl(
    <SearchBar/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
