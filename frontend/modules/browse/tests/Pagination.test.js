import React from 'react';
import Pagination from '../components/Pagination';
import createComponentWithRouter from '../../../jest_mocks/createComponentWithRouter';

test('Loading component test', () => {
  const buildUrl = jest.fn();
  const component = createComponentWithRouter(
    <Pagination offset={0} limi={6} coun={3} buildUrl={ buildUrl }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
