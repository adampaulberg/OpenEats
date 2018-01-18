import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Filter = ({title, qsTitle, data, qs, multiSelect, cssClass, buildUrl}) => {
  const clear = qs[qsTitle] ?
    <div>
      <Link
        activeClassName=''
        to={ buildUrl(qsTitle, '') }
        className="list-group-item clear-search">
        <span className="">Clear</span>
      </Link>
    </div>
    : '';

  const items = data.map((item) => {
    if (item.total == 0) {
      return null;
    }

    let active = false;
    if (qs[qsTitle]) {
      if (qs[qsTitle].split(',').includes(item.slug.toString())) {
        active = true;
      }
    }

    return (
      <div>
        <Link
            key={ item.slug }
            to={ buildUrl(qsTitle, item.slug, multiSelect) }
            className={ classNames({"list-group-item": true, "active": active }) }>
          { active ? <span className="glyphicon glyphicon-remove"/> : null }
          { item.title }
          { item.total ? <span className="badge">{ item.total }</span> : '' }
        </Link>
      </div>
    );
  });

  return (
    <div className={ "list-group filter " + cssClass }>
      { title }
      { items }
      {/*{ clear }*/}
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  qsTitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  multiSelect: PropTypes.bool,
  qs: PropTypes.object.isRequired,
  cssClass: PropTypes.string,
  buildUrl: PropTypes.func.isRequired,
};

export default Filter;