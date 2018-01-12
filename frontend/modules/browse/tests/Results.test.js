import React from 'react';
import Results from '../components/Results';
import renderer from 'react-test-renderer';

test('Loading component test', () => {
  const component = renderer.create(
    <Results/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
