import React, { Component } from 'react';
import { Booking, NoBooking } from './Booking';
import Search from './Search';
import DummyNetwork from './DummyNetwork';
import './Tracker.css';


let inital_booking = null;
const paths = window.location.pathname.split('/');
if(paths[1]==="booking")
  inital_booking = JSON.parse(DummyNetwork.get_booking(paths[2]));


class Tracker extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      booking: inital_booking,
      savedBookings: [],
    };

    this.findBooking = this.findBooking.bind(this);
    this.saveBooking = this.saveBooking.bind(this);
    this.removeSavedBooking = this.removeSavedBooking.bind(this);
    this.removeAllSavedBookings = this.removeAllSavedBookings.bind(this);
  }
  
  findBooking(searchQuery){
    this.setState({booking: JSON.parse(DummyNetwork.get_booking(searchQuery))});
  }  

  saveBooking(bookingNumber){
    let bookings = this.state.savedBookings;
    bookings.push(bookingNumber);
    bookings = bookings.filter(function(item, index){
      return bookings.indexOf(item) === index;
    });
    this.setState({savedBookings: bookings});
  }  

  removeSavedBooking(bookingNumber){
    let bookings = this.state.savedBookings.filter(function(booking){
      return booking !== bookingNumber;
    });
    this.setState({savedBookings: bookings});
  }
  removeAllSavedBookings(){
    this.setState({savedBookings: []});
  }

  render(){
    const search = <Search findBooking={this.findBooking}
          savedBookings={this.state.savedBookings}
          removeSavedBooking={this.removeSavedBooking}
          removeAllSavedBookings={this.removeAllSavedBookings}
          />;
    return (
      <div id="page">
        <Header search={search} />
        <Body
          currentBooking={this.state.booking}
          saveBooking={this.saveBooking}
          search={search}
          />
        <Footer />
      </div>
    );
  }
}


class Header extends Component {
  render(){
    return (
      <div id="header" className="clearfix">
        <h1>Track and Trace</h1>
        {this.props.search}
      </div>
    );
  }
}


class Body extends Component {
  render(){
    let selectedBooking = "";
    if(this.props.currentBooking)
      selectedBooking = <Booking booking={this.props.currentBooking} saveBooking={this.props.saveBooking} key={this.props.currentBooking.booking_number} />;
    else if(this.props.currentBooking === false)
      selectedBooking = <NoBooking />

    return (
      <div id="body">
        <h2>Get information about a booking:</h2>
        {this.props.search}

        {selectedBooking}
      </div>
    );
  }
}


class Footer extends Component {
  render(){
    return (
      <div id="footer">        
        <p>A small tool for tracking shipments.</p>
        <p>Demo booking numbers:</p>
        <blockquote>TXG790195100<br/>TXG790214500</blockquote>
      </div>
    );
  }
}

export default Tracker;
