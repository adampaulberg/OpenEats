import React from 'react'
import PropTypes from 'prop-types'

import ListRecipes from './ListRecipes'
import Pagination from './Pagination'

const Results = ({ search, qs, buildUrl }) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div id="browse" className="row">
          <ListRecipes
            format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            data={ search.recipes }
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Pagination
              limit={ qs.limit }
              count={ search.totalRecipes }
              offset={ qs.offset }
              buildUrl={ buildUrl }
            />
          </div>
        </div>
      </div>
    </div>
  )
};

Results.propTypes = {
  search: PropTypes.object,
  qs: PropTypes.object,
  buildUrl: PropTypes.func
};

export default Results;