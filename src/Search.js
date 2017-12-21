import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchQuery: "",
      expanded: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showResults = this.showResults.bind(this);
    this.hideResults = this.hideResults.bind(this);
    this.showBooking = this.showBooking.bind(this);
    this.setSearchRef = this.setSearchRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick);
  }
  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick);
  }
  
  handleClick(event){
    if(this.searchRef && !this.searchRef.contains(event.target)){
      this.hideResults();
    } else {
      this.showResults();
    }    
  }
  
  handleChange(event){
    const query = event.target.value.toUpperCase()
    this.setState({searchQuery: query});
    this.showResults();
  }
  
  handleSubmit(event){
    event.preventDefault();
    this.showBooking(this.state.searchQuery);
  }
  
  showBooking(booking_number){
    this.props.findBooking(booking_number);
    this.hideResults();
  }
  
  showResults(){
    this.setState({expanded: true});
  }
  hideResults(){    
    this.setState({expanded: false});
  }
  
  setSearchRef(node){
    this.searchRef = node;
  }
  
  render(){
    return (
      <div id="search" className="booking_search" ref={this.setSearchRef}>
        <div className="input">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Booking number"
              value={this.state.searchQuery}
              onChange={this.handleChange} />
          </form>
        </div>
        <SearchResults
          expanded={this.state.expanded}
          searchQuery={this.state.searchQuery}
          showBooking={this.showBooking}
          savedBookings={this.props.savedBookings}
          removeSavedBooking={this.props.removeSavedBooking}
          removeAllSavedBookings={this.props.removeAllSavedBookings}
          />
      </div>
    );
  }
}


class SearchResults extends Component {
  constructor(props){
    super(props);

    this.removeAllSavedBookings = this.removeAllSavedBookings.bind(this);
  }

  removeAllSavedBookings(event){
    event.preventDefault();
    this.props.removeAllSavedBookings();
  }

  render(){
    const showBookingFn = this.props.showBooking;
    const removeBookingFn = this.props.removeSavedBooking;
    const saved_bookings = this.props.savedBookings.map(function(booking){
      return <SearchResult
               key={booking}
               bookingNumber={booking}
               saved={true}
               showBooking={showBookingFn}
               removeSavedBooking={removeBookingFn}               
               />;
    });
    
    return (
      <div className={"results" + (this.props.expanded ? "" : " hidden")}>
        {this.props.searchQuery.length > 0 &&
          <div className="search_results">
            <div className="title">Search for booking</div>
            <ul>
              <SearchResult
                bookingNumber={this.props.searchQuery}
                showBooking={showBookingFn}
                removeSavedBooking={this.props.removeSavedBooking}
                />
            </ul>
          </div>
        }
        {this.props.savedBookings.length > 0 &&
          <div className="saved_results">
            <div className="title">Saved bookings</div>
            <ul>
              {saved_bookings}
            </ul>
            <div className="clear">
              <a href="#" className="button button-clear" onClick={this.removeAllSavedBookings}>Remove all</a>
            </div>
          </div>
        }        
      </div>
    );
  }
}


class SearchResult extends Component {
  constructor(props){
    super(props);
    this.removeSavedBooking = this.removeSavedBooking.bind(this);
    this.clickBooking = this.clickBooking.bind(this);
  }
  clickBooking(event){
    event.preventDefault();
    this.props.showBooking(this.props.bookingNumber);
  }
  removeSavedBooking(event){
    event.preventDefault();
    this.props.removeSavedBooking(this.props.bookingNumber);
  }
  render(){
    return (
      <li>
        <a href="#"
          onClick={this.clickBooking}>
          {this.props.bookingNumber}
        </a>
        {this.props.saved &&
          <div className="remove">
            <a href="#" className="button button-outline" onClick={this.removeSavedBooking}>remove</a>
          </div>
        }        
      </li>
    );
  }
}


export default Search;
