import React from 'react';
import Filter from '../components/Filter';
import renderer from 'react-test-renderer';

test('Loading component test', () => {
  const component = renderer.create(
    <Filter/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
