import React from 'react'
import { Link } from 'react-router-dom'

import Filter from './Filter'
import SearchBar from './SearchBar'

class SearchMenu extends React.Component {
  reset = () => (
    <div className="btn-group" role="group">
      <Link className="btn btn-default" to={ this.props.buildUrl('', '') }>
        Reset
      </Link>
    </div>
  );

  showReset = () => {
    // Create arrays of property names
    let qs = Object.getOwnPropertyNames(this.props.qs);
    let defaults = Object.getOwnPropertyNames(this.props.defaults);

    // If number of properties is different,
    // objects are not equivalent
    if (qs.length != defaults.length) {
      return false;
    }

    for (let i = 0; i < qs.length; i++) {
      let propName = qs[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (this.props.qs[propName] != this.props.defaults[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  };

  render() {
    let { courses, cuisines, ratings, qs, count } = this.props;
    let { doFilter, buildUrl } = this.props;

    return (
      <div className="row search-menu">
        <SearchBar format="col-xs-12" value={ qs.search } filter={ doFilter }/>
        <div className="col-xs-12">
          <Filter
            title="course"
            data={ courses || [] }
            filter={ qs }
            buildUrl={ buildUrl }
          />
          <Filter
            title="cuisine"
            data={ cuisines || [] }
            filter={ qs }
            buildUrl={ buildUrl }
          />
          <Filter
            title="rating"
            data={ ratings || [] }
            filter={ qs }
            buildUrl={ buildUrl }
          />
          <Filter
            title="limit"
            data={[
              {id: 1, title: "2", slug: "2"},
              {id: 2, title: "6", slug: "6"},
              {id: 3, title: "12", slug: "12"},
            ]}
            filter={ qs }
            buildUrl={ buildUrl }
          />
          <Filter
            title="ordering"
            data={[
              {id: 1, title: "title", slug: "-title"},
              {id: 2, title: "pub_date", slug: "pub_date"},
              {id: 3, title: "rating", slug: "-rating"},
            ]}
            filter={ qs }
            buildUrl={ buildUrl }
          />
          { !this.showReset() ? this.reset() : '' }
          <div className="page-count">
            { count } recipes
          </div>
        </div>
      </div>
    );
  }
}

export default SearchMenu;