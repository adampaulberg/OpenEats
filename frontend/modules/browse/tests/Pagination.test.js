import React from 'react';
import Loading from '../components/Pagination';
import renderer from 'react-test-renderer';

test('Loading component test', () => {
  const component = renderer.create(
    <Pagination/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
