import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
  static propTypes = {
    booksInShelf: PropTypes.array,
    onBookUpdate: PropTypes.func.isRequired
  }

  state = {
    booksFromSearch: [],
    query: ''
  }

  onSearch = (query) => {
    if (query.length === 0) {
      // Remove the search result and make sure 'Search results are not shown when all of the text is deleted out of the search input box.'
      this.setState({query: '', booksFromSearch: []})
    } else {
      BooksAPI.search(query).then((books) => {
        if (books.error !== undefined) {
          // bookGrid.innerHTML = '<h2>Air ball! Try another keyword.</h2>'
        } else {
          books.map(book => (this.props.booksInShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
          this.setState({query: query, booksFromSearch: books})
        }
      })
    }
  }

  passBookUpdate = (book, shelf) => {
    console.log('=========');
    console.log(book);
    console.log(shelf);
    console.log('=========');
    this.props.onBookUpdate(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.booksFromSearch.map(bookInfo => (
                  <Book bookInfo={bookInfo} key={bookInfo.id} onBookUpdate={this.passBookUpdate}/>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
