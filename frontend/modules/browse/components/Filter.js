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

class Filter extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;
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

    const items = this.props.data.map((item) => {
      if (this.props.title == "rating") {
        item.slug = item.rating;
        item.title = formatMessage(messages.x_stars, {rating: item.rating});
      }

      if (item.total == 0) {
        return null;
      }

      return (
        <LinkContainer to={ this.props.buildUrl(this.props.title, item.slug) }>
          <MenuItem
            className={classNames({
              active: this.props.filter[this.props.title] === item.slug.toString()
            })}
            key={ item.slug }
          >
            { item.title }
            { item.total ? <span className="badge">{ item.total }</span> : '' }
          </MenuItem>
        </LinkContainer>
      );
    });

    return (
      <DropdownButton id="1" title={formatMessage(messages.filter_x, {title: this.props.title})}>
        { items }
        { this.props.filter[this.props.title] ?
          <LinkContainer to={ this.props.buildUrl(this.props.title, '') }>
            <MenuItem className="clear-filter">
              {formatMessage(messages.clear_filter)}
            </MenuItem>
          </LinkContainer>
          : ''
        }
      </DropdownButton>
    );
  }
}

export default injectIntl(Filter);