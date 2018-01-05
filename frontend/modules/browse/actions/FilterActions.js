import queryString from 'query-string'

import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import FilterConstants from '../constants/FilterConstants'

export const loadCourses = (filter) => {
  return dispatch => {
    // dispatch({actionType: FilterConstants.REQUEST_LOAD_COURSES});
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request()
      .get(serverURLs.course_count)
      .query(parsed_filter)
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_COURSE,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ));
  }
};

export const loadCuisines = (filter) => {
  return dispatch => {
    // dispatch({actionType: FilterConstants.REQUEST_LOAD_CUISINES});
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request()
      .get(serverURLs.cuisine_count)
      .query(parsed_filter)
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_CUISINE,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ));
  }
};

export const loadRatings = (filter) => {
  return dispatch => {
    // dispatch({actionType: FilterConstants.REQUEST_LOAD_RATINGS});
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request()
      .get(serverURLs.ratings)
      .query(parsed_filter)
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_RATING,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ));
  }
};
