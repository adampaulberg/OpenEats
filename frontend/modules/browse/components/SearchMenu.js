import React from 'react'
import { Link } from 'react-router-dom'

import Filter from './Filter'
import SearchBar from './SearchBar'

class SearchMenu extends React.Component {
  reset = () => (
    <div className="btn-group filter-group" role="group">
      <Link className="btn btn-default" to={ this.props.buildUrl('', '') }>
        Reset
      </Link>
    </div>
  );

  render() {
    let { courses, cuisines, ratings, qs, count } = this.props;
    let { doSearch, buildUrl } = this.props;

    return (
      <div className="row search-menu">
        <SearchBar format="col-xs-12" value={ qs.search } doSearch={ doSearch }/>
        <div className="col-xs-12">
          <Filter
            title="course"
            data={ courses || [] }
            qs={ qs }
            multiSelect={ true }
            buildUrl={ buildUrl }
          />
          <Filter
            title="cuisine"
            data={ cuisines || [] }
            qs={ qs }
            multiSelect={ true }
            buildUrl={ buildUrl }
          />
          <Filter
            title="rating"
            data={ ratings || [] }
            qs={ qs }
            multiSelect={ true }
            buildUrl={ buildUrl }
          />
          <Filter
            title="limit"
            data={[
              {id: 1, title: "2", slug: "2"},
              {id: 2, title: "6", slug: "6"},
              {id: 3, title: "12", slug: "12"},
            ]}
            qs={ qs }
            buildUrl={ buildUrl }
          />
          <Filter
            title="ordering"
            data={[
              {id: 1, title: "title", slug: "-title"},
              {id: 2, title: "pub_date", slug: "pub_date"},
              {id: 3, title: "rating", slug: "-rating"},
            ]}
            qs={ qs }
            buildUrl={ buildUrl }
          />
          { Object.keys(qs).length !== 0 ? this.reset() : '' }
          <div className="page-count">
            { count } recipes
          </div>
        </div>
      </div>
    );
  }
}

export default SearchMenu;