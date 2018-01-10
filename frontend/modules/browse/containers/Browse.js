import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { injectIntl } from 'react-intl';

import history from '../../common/history'
import SearchMenu from '../components/SearchMenu'
import Results from '../components/Results'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'
import * as SearchActions from '../actions/SearchActions'
import * as FilterActions from '../actions/FilterActions'
import DefaultFilters from '../constants/DefaultFilters'
import documentTitle from '../../common/documentTitle'

class Browse extends React.Component {
  componentDidMount() {
    documentTitle(this.props.intl.messages['nav.recipes']);
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
    if (!this.props.search.results[queryString.stringify(this.mergeDefaultFilters(qs))]) {
      this.props.searchActions.loadRecipes(this.mergeDefaultFilters(qs));
    }
    if (!this.props.courses.results[queryString.stringify(this.mergeDefaultFilters(qs))]) {
      this.props.filterActions.loadCourses(this.mergeDefaultFilters(qs));
    }
    if (!this.props.cuisines.results[queryString.stringify(this.mergeDefaultFilters(qs))]) {
      this.props.filterActions.loadCuisines(this.mergeDefaultFilters(qs));
    }
    if (!this.props.ratings.results[queryString.stringify(this.mergeDefaultFilters(qs))]) {
      this.props.filterActions.loadRatings(this.mergeDefaultFilters(qs));
    }
  }

  doSearch = (value) => {
    console.log('hi');
    let qs = queryString.parse(this.props.location.search);
    value !== "" ? qs['search'] = value : delete qs['search'];
    let str = queryString.stringify(qs);
    str = str ? '/browse/?' + str : '/browse/';
    history.push(str);
  };

  buildUrl = (name, value, multiSelect=false) => {
    if (!name) return '/browse/';

    let qs = queryString.parse(this.props.location.search);

    if (value !== "") {
      if (qs[name] && multiSelect) {
        let query = qs[name].split(',');
        if (query.includes(value)) {
          if (query.length === 1) {
            delete qs[name];
          } else {
            let str = '';
            query.map(val => { val != value ? str += val + ',' : ''});
            qs[name] = str.substring(0, str.length - 1);
          }
        } else {
          qs[name] = qs[name] + ',' + value;
        }
      } else {
        qs[name] = value;
      }
    } else {
      delete qs[name];
    }

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
    let { search, courses, cuisines, ratings, location } = this.props;
    const qs = queryString.parse(location.search);
    const qsString = queryString.stringify(this.mergeDefaultFilters(qs));

    if (Object.keys(search.results).length > 0) {
      return (
        <div className="container">
          <SearchMenu
            courses={ courses.results[qsString] }
            cuisines={ cuisines.results[qsString] }
            ratings={ ratings.results[qsString] }
            qs={ qs }
            count={ search.results[qsString] ? search.results[qsString].totalRecipes : 0 }
            doSearch={ this.doSearch }
            buildUrl={ this.buildUrl }
          />
          {
            search.loading ?
              <Loading/> :
              !search.results[qsString] || search.results[qsString].recipes.length == 0 ?
                <NoResults/> :
                <Results
                  search={ search.results[qsString] }
                  qs={ qs }
                  defaults={ DefaultFilters }
                  buildUrl={ this.buildUrl }
                />
          }
        </div>
      );
    } else {
      return <Loading/>
    }
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

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse));