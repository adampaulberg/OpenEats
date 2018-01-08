import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

require("./../css/filter.scss");

const Filter = ({title, data, qs, multiSelect, buildUrl, intl}) => {
  const messages = defineMessages({
    filter_x: {
      id: 'filter.filter_x',
      description: 'Filter field',
      defaultMessage: 'Filter {title}',
    },
    clear_filter: {
      id: 'filter.clear_filter',
      description: 'Clear filter button',
      defaultMessage: 'Clear filter',
    },
    x_stars: {
      id: 'filter.x_stars',
      description: 'X Stars',
      defaultMessage: '{rating, number} stars',
    }
  });

  const defaultHeader = intl.formatMessage(messages.filter_x, {title: title});
  let header = '';

  const clear = qs[title] ?
    <LinkContainer
      activeClassName=''
      to={ buildUrl(title, '') }
      className="btn btn-danger clear-search">
      <span className="glyphicon glyphicon glyphicon-remove"/>
    </LinkContainer>
    : '';

  const items = data.map((item) => {
    if (item.total == 0) {
      return null;
    }

    let active = false;
    if (title == "rating") {
      item.slug = item.rating;
      item.title = intl.formatMessage(messages.x_stars, {rating: item.rating});
    }
    if (qs[title]) {
      if (qs[title].split(',').includes(item.slug.toString())) {
        active = true;
        header += item.title + ', ';
      }
    }

    return (
      <LinkContainer key={ item.slug } to={ buildUrl(title, item.slug, multiSelect) }>
        <MenuItem className={ classNames({ active: active }) }>
          { item.title }
          { item.total ? <span className="badge">{ item.total }</span> : '' }
        </MenuItem>
      </LinkContainer>
    );
  });

  return (
    <div className="btn-group filter-group">
      <DropdownButton id="" title={ header.substring(0, header.length - 2) || defaultHeader }>
        { items }
      </DropdownButton>
      { clear }
    </div>
  );
};

export default injectIntl(Filter);