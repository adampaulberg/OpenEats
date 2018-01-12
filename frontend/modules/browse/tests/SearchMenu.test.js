import React from 'react';
import SearchMenu from '../components/SearchMenu';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('Loading component test', () => {
  const component = createComponentWithIntl(
    <SearchMenu/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
