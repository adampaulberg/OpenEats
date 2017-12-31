import React from 'react'
import Spinner from 'react-spinkit';
import {
    injectIntl,
    defineMessages
} from 'react-intl';

import SearchMenu from './SearchMenu'
import Results from './Results'
import NoResults from './NoResults'

require("./../css/browse.scss");

class Search extends React.Component {
  render() {

    let { search, courses, cuisines, ratings, defaults, qs } = this.props;

    return (
      <div className="container">
        <SearchMenu
          courses={ courses }
          cuisines={ cuisines }
          ratings={ ratings }
          qs={ qs }
          defaults={ defaults }
          count={ search.totalRecipes }
          doFilter={ this.props.updateURL }
        />
        {
          search.recipes === undefined || search.recipes.length == 0 ?
            <NoResults/>
          :
            <Results
              search={ search }
              qs={ qs }
              updateURL={ this.props.updateURL }
            />
        }
      </div>
    );
  }
}

export default injectIntl(Search);