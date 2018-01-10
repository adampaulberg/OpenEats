import React from 'react'
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Filter = ({title, qsTitle, data, qs, multiSelect, buildUrl}) => {
  let header = '';
  const clear = qs[qsTitle] ?
    <LinkContainer
      activeClassName=''
      to={ buildUrl(qsTitle, '') }
      className="btn btn-danger clear-search">
      <span className="glyphicon glyphicon glyphicon-remove"/>
    </LinkContainer>
    : '';

  const items = data.map((item) => {
    if (item.total == 0) {
      return null;
    }

    let active = false;
    if (qs[qsTitle]) {
      if (qs[qsTitle].split(',').includes(item.slug.toString())) {
        active = true;
        header += item.title + ', ';
      }
    }

    return (
      <LinkContainer key={ item.slug } to={ buildUrl(qsTitle, item.slug, multiSelect) }>
        <MenuItem className={ classNames({ active: active }) }>
          { item.title }
          { item.total ? <span className="badge">{ item.total }</span> : '' }
        </MenuItem>
      </LinkContainer>
    );
  });

  return (
    <div className="btn-group filter-group">
      <DropdownButton id="" title={ header.substring(0, header.length - 2) || title }>
        { items }
      </DropdownButton>
      { clear }
    </div>
  );
};

export default Filter;