import React from 'react'

class Pagination extends React.Component {
  onClick = (event) => {
    event.preventDefault();
    if (this.props.filter) {
      this.props.filter('offset', parseInt(event.target.name));
    }
  };

  link = (title, offset, key) => (
    <li className="page-item" key={ key }>
      <a className="page-link" href="#" name={ offset } onClick={ this.onClick }>
        { title }
      </a>
    </li>
  );

  numbers = (offset, limit, count) => {
    let numbers = [];

    const min = 2, max = 5;
    // Make sure we start at the min value
    let start = offset - min < 1 ? 1 : offset - min;
    // Make sure we start at the max value
    start = start > count/limit-max ? count/limit-max : start;
    // Only show data if we have results
    start = start < 1 ? 1 : start;

    for (let i = start; i < count/limit && i < max + start; i++) {
      numbers.push(this.link(i+1, limit*i, i+1))
    }
    return numbers
  };

  render() {
    let offset = this.props.offset ? parseInt(this.props.offset) : 0;
    let limit = this.props.limit ? parseInt(this.props.limit) : 0;
    let count = this.props.count ? parseInt(this.props.count) : 0;
    let next = offset + limit;
    let previous = offset - limit;

    return (
      <div className="text-center">
        <ul className="pagination">
          { (previous >= 0) ? this.link('←', previous, 'previous') : '' }
          { this.link('1', 0, 'first') }
          { this.numbers(offset, limit, count) }
          { (next < count) ? this.link('→', next, 'next') : '' }
        </ul>
      </div>
    )
  }
}

export default Pagination;
