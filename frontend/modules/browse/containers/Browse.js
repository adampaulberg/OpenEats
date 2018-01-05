import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'

import history from '../../common/history'
import Search from '../components/Search'
import * as SearchActions from '../actions/SearchActions'
import * as FilterActions from '../actions/FilterActions'
import DefaultFilters from '../constants/DefaultFilters'
import documentTitle from '../../common/documentTitle'

class Browse extends React.Component {
  componentDidMount() {
    // documentTitle(this.props.intl.messages['nav.recipes']);
    this.reloadData(queryString.parse(this.props.location.search))
  }

  componentWillUnmount() {
    documentTitle();
  }

  componentWillReceiveProps(nextProps) {
    let query = queryString.parse(this.props.location.search);
    let nextQuery = queryString.parse(nextProps.location.search);
    if (query.offset !== nextQuery.offset) {
      this.reloadData(nextQuery);
    } else if (query.limit !== nextQuery.limit) {
      this.reloadData(nextQuery);
    } else if (query.ordering !== nextQuery.ordering) {
      this.reloadData(nextQuery);
    } else if (query.offset !== nextQuery.offset) {
      this.reloadData(nextQuery);
    } else if (query.course !== nextQuery.course) {
      this.reloadData(nextQuery);
    } else if (query.cuisine !== nextQuery.cuisine) {
      this.reloadData(nextQuery);
    } else if (query.rating !== nextQuery.rating) {
      this.reloadData(nextQuery);
    } else if (query.search !== nextQuery.search) {
      this.reloadData(nextQuery);
    }
  }

  reloadData(qs) {
    console.log('-----------------')
    console.log(this.props.search[this.mergeDefaultFilters(qs)])
    console.log(this.props.search[queryString.stringify(this.mergeDefaultFilters(qs))])
    console.log('-----------------')
    if (!this.props.search[queryString.stringify(this.mergeDefaultFilters(qs))]) {
      this.props.searchActions.loadRecipes(this.mergeDefaultFilters(qs));
    }
    this.props.filterActions.loadCourses(this.mergeDefaultFilters(qs));
    this.props.filterActions.loadCuisines(this.mergeDefaultFilters(qs));
    this.props.filterActions.loadRatings(this.mergeDefaultFilters(qs));
  }

  doSearch = (value) => {
    console.log('hi');
    let qs = queryString.parse(this.props.location.search);
    value !== "" ? qs['search'] = value : delete qs['search'];
    let str = queryString.stringify(qs);
    str = str ? '/browse/?' + str : '/browse/';
    history.push(str);
  };

  buildUrl = (name, value) => {
    if (!name) return '/browse/';

    let qs = queryString.parse(this.props.location.search);
    value !== "" ? qs[name] = value : delete qs[name];
    let str = queryString.stringify(qs);
    return str ? '/browse/?' + str : '/browse/';
  };

  mergeDefaultFilters = (query) => {
    let filter = {};

    if (Object.keys(DefaultFilters).length > 0) {
      for (let key in DefaultFilters) {
        filter[key] = DefaultFilters[key];
      }
    }

    if (Object.keys(query).length > 0) {
      for (let key in query) {
        filter[key] = query[key];
      }
    }

    return filter
  };

  render() {
    let { search, courses, cuisines, ratings } = this.props;
    let { filterActions, searchActions } = this.props;
    const qs = this.mergeDefaultFilters(queryString.parse(this.props.location.search));
    const qsString = queryString.stringify(qs);
    console.log('=============')
    console.log(search)
    console.log(qsString)
    console.log('=============')
    return (
      <Search
        search={ search[qsString] || {} }
        courses={ courses }
        cuisines={ cuisines }
        ratings={ ratings }
        defaults={ DefaultFilters }
        qs={ qs }
        doSearch={ this.doSearch }
        buildUrl={ this.buildUrl }
        filterActions={ filterActions }
        searchActions={ searchActions }
      />
    );
  }
}

// Recipe.propTypes = {
//   recipes: PropTypes.array.isRequired,
//   lists: PropTypes.array.isRequired,
//   status: PropTypes.string.isRequired,
//   user: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
//   recipeActions: PropTypes.object.isRequired,
//   recipeItemActions: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  search: state.browse.search,
  courses: state.browse.filters.courses,
  cuisines: state.browse.filters.cuisines,
  ratings: state.browse.filters.ratings,
});

const mapDispatchToProps = (dispatch, props) => ({
  filterActions: bindActionCreators(FilterActions, dispatch),
  searchActions: bindActionCreators(SearchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
