import React from 'react';
import ListRecipes from '../components/ListRecipes';
import renderer from 'react-test-renderer';

test('Loading component test', () => {
  const component = renderer.create(
    <ListRecipes/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
