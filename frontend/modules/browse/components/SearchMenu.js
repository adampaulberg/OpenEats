import React from 'react'
import { Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages
} from 'react-intl';

import Filter from './Filter'
import SearchBar from './SearchBar'

require("./../css/filter.scss");

const SearchMenu = ({courses, cuisines, ratings, qs, count, doSearch, buildUrl, intl}) => {
  const messages = defineMessages({
    reset: {
      id: 'filter.reset',
      description: 'Filter reset',
      defaultMessage: 'Reset',
    },
    filter_course: {
      id: 'filter.filter_course',
      description: 'Filter field course',
      defaultMessage: 'Courses',
    },
    filter_cuisine: {
      id: 'filter.filter_cuisine',
      description: 'Filter field cuisine',
      defaultMessage: 'Cuisines',
    },
    filter_rating: {
      id: 'filter.filter_rating',
      description: 'Filter field rating',
      defaultMessage: 'Ratings',
    },
    filter_limit: {
      id: 'filter.filter_limit',
      description: 'Filter field limit',
      defaultMessage: 'Recipes per Page',
    },
    title: {
      id: 'filter.title',
      description: 'Title',
      defaultMessage: 'Title',
    },
    rating: {
      id: 'filter.rating',
      description: 'rating',
      defaultMessage: 'Rating',
    },
    recipes: {
      id: 'filter.recipes',
      description: 'recipes',
      defaultMessage: 'recipes',
    },
    pub_date: {
      id: 'filter.pub_date',
      description: 'pub_date',
      defaultMessage: 'Created Date',
    },
    filter_ordering: {
      id: 'filter.filter_ordering',
      description: 'Filter field ordering',
      defaultMessage: 'Ordering',
    },
    x_stars: {
      id: 'filter.x_stars',
      description: 'X Stars',
      defaultMessage: '{rating, number} stars',
    }
  });

  const reset = () => (
    <div className="btn-group filter-group" role="group">
      <Link className="btn btn-default" to={ buildUrl('', '') }>
        { intl.formatMessage(messages.reset) }
      </Link>
    </div>
  );

  return (
    <div className="row search-menu">
      <SearchBar format="col-xs-12" value={ qs.search } doSearch={ doSearch }/>
      <div className="col-xs-12">
        <Filter
          title={ intl.formatMessage(messages.filter_course) }
          qsTitle="course"
          data={ courses || [] }
          qs={ qs }
          multiSelect={ true }
          buildUrl={ buildUrl }
        />
        <Filter
          title={ intl.formatMessage(messages.filter_cuisine) }
          qsTitle="cuisine"
          data={ cuisines || [] }
          qs={ qs }
          multiSelect={ true }
          buildUrl={ buildUrl }
        />
        <Filter
          title={ intl.formatMessage(messages.filter_rating) }
          qsTitle="rating"
          data={
            ratings ? ratings.map(r => {
              r.slug = r.rating;
              r.title = intl.formatMessage(messages.x_stars, {rating: r.rating});
              return r;
            }) : []
          }
          qs={ qs }
          multiSelect={ true }
          buildUrl={ buildUrl }
        />
        <Filter
          title={ intl.formatMessage(messages.filter_limit) }
          qsTitle="limit"
          data={[
            {id: 1, title: "4", slug: "4"},
            {id: 2, title: "8", slug: "8"},
            {id: 3, title: "16", slug: "16"},
          ]}
          cssClass='hidden-xs'
          qs={ qs }
          buildUrl={ buildUrl }
        />
        <Filter
          title={ intl.formatMessage(messages.filter_ordering) }
          qsTitle="ordering"
          data={[
            {id: 1, title: intl.formatMessage(messages.title), slug: "title"},
            {id: 2, title: intl.formatMessage(messages.pub_date), slug: "-pub_date"},
            {id: 3, title: intl.formatMessage(messages.rating), slug: "-rating"},
          ]}
          cssClass='hidden-xs'
          qs={ qs }
          buildUrl={ buildUrl }
        />
        { Object.keys(qs).length !== 0 ? reset() : '' }
        <div className="page-count hidden-xs">
          { count } { intl.formatMessage(messages.recipes) }
        </div>
      </div>
    </div>
  );
};

export default injectIntl(SearchMenu);
