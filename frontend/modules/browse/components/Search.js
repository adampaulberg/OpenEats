import React from 'react'
import PropTypes from 'prop-types'

import SearchMenu from '../components/SearchMenu'
import SearchBar from '../components/SearchBar'
import Results from '../components/Results'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'

const Search = ({ search, courses, cuisines, ratings, qs, qsString, buildUrl, doSearch, defaultFilters }) => {
  if (Object.keys(search.results).length > 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-sm-3 col-xs-12 ">
            <SearchMenu
              courses={ courses.results[qsString] }
              cuisines={ cuisines.results[qsString] }
              ratings={ ratings.results[qsString] }
              qs={ qs }
              count={ search.results[qsString] ? search.results[qsString].totalRecipes : 0 }
              buildUrl={ buildUrl }
            />
          </div>
          <div className="col-lg-10 col-sm-9 col-xs-12">
            <SearchBar format="" value={ qs ? qs.search : '' } doSearch={ doSearch }/>
            {
              search.loading ?
                <Loading/> :
                !search.results[qsString] || search.results[qsString].recipes.length == 0 ?
                  <NoResults/> :
                  <Results
                    search={ search.results[qsString] }
                    qs={ qs }
                    defaults={ defaultFilters }
                    buildUrl={ buildUrl }
                  />
            }
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading/>
  }
};

// Results.propTypes = {
//   search: PropTypes.object,
//   qs: PropTypes.object,
//   buildUrl: PropTypes.func
// };

export default Search;