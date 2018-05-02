import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  render() {
    return (
      <li>
        <div className="book-top">
          {
            // handle the missing thumbnail
            this.props.bookInfo.imageLinks === undefined
              ? (
                <div className="book-cover" style={{ width: 128, height: 193, backgroundColor:`grey` }}></div>
              )
              : (
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookInfo.imageLinks.thumbnail})` }}></div>
              )
          }
          <div className="book-shelf-changer">
            <select onChange={(e) => this.props.onBookUpdate(this.props.bookInfo, e.target.value)} defaultValue={this.props.bookInfo.shelf}>
              <option value="" disabled>Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookInfo.title}</div>
        <div className="book-authors">{
          // Handle the missing author
          this.props.bookInfo.authors === undefined
            ? (
              <p>Author not found</p>
            )
            : (
              this.props.bookInfo.authors.map(author => <p key={author}>{author}<br /></p>)
            )
        }</div>
      </li>
    )
  }
}

export default Book
