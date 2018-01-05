import { combineReducers } from 'redux'
import FilterConstants from '../constants/FilterConstants'

function createFilterWithNamedType(filterName = '') {
  return function filter(state = [], action) {
    if (action.filterName !== filterName) {
      return state;
    }

    switch (action.type) {
      case FilterConstants.BROWSE_FILTER_LOAD:
      // return action.res;
      let newFilter = {};
      newFilter[action.qs] = action.res;

      return {
        ...state,
        ...newFilter
      };
      default:
        return state;
    }
  }
}

const filters = combineReducers({
  courses: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_COURSE),
  cuisines: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_CUISINE),
  ratings: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_RATING),
});

export default filters
