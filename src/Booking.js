import React, { Component } from 'react';


export class Booking extends Component {
  constructor(props){
    super(props);
    this.saveBooking = this.saveBooking.bind(this);
    this.state = {saved: false};

    this.navigateToBooking = this.navigateToBooking.bind(this);
  }
  
  saveBooking(event){
    event.preventDefault();
    this.props.saveBooking(this.props.booking.booking_number);

    if(this.state.saved === true) return;
    this.setState({saved: true});
    setTimeout(() => this.setState({saved: false}), 1750);
  }

  navigateToBooking(event){
    event.preventDefault();
    window.history.pushState("","", "/booking/" + this.props.booking.booking_number);
  }
  
  render(){
    const updates = this.props.booking.updates;
    const containers = this.props.booking.containers.map(function(container){
      return (<Container
                key={container.number}
                container={container}
                bookingUpdates={updates} />);
    });
    return (
      <div className="booking_result">
        <div className="title">
          Booking found <a href={"/booking/"+this.props.booking.booking_number}
            onClick={(e) => this.navigateToBooking(e, this.props.booking.booking_number)}>
          {this.props.booking.booking_number}
          </a>
        </div>
        <div className="save">
          <a className="button" href="#" onClick={this.saveBooking}>
            {this.state.saved ? "Saved!" : "Save this booking"}
          </a>
        </div>
        <blockquote>
          Booking number: {this.props.booking.booking_number}<br/>
          Steamship line: {this.props.booking.line}<br/>
          Origin: {this.props.booking.origin}<br/>
          Destination: {this.props.booking.destination}<br/>
        </blockquote>
        <div className="containers">
          <h4>Containers ({this.props.booking.containers.length}):</h4>
          {containers}
        </div>
      </div>
    );
  }
}


export class NoBooking extends Component {
  render(){
    return (
      <div className="booking_result error">
        <div className="title">
          No booking found.
        </div>
      </div>
    );
  }
}


class Container extends Component {
  render(){
    return (
      <div className="container">
        <blockquote>
          Container number: {this.props.container.number}<br/>
          Size: {this.props.container.size}<br/>
          Type: {this.props.container.type}<br/>
          Last status: {this.props.container.last_status}<br/>
          Last status at: {this.props.container.last_status_at}<br/>
          Location: {this.props.container.location}<br/>
        </blockquote>
        <ContainerHistory container={this.props.container} bookingUpdates={this.props.bookingUpdates} />
      </div>
    );
  }
}


class ContainerHistory extends Component {
  constructor(props){
    super(props);
    this.state = {shown: false};
    this.toggleHistory = this.toggleHistory.bind(this);
  }
  
  toggleHistory(event){
    this.setState({shown: !this.state.shown});
    event.preventDefault();
  }
  
  render(){
    const container_number = this.props.container.number;
    const container_updates = this.props.bookingUpdates.map(function(update, index){
      if(update.container_number === container_number)
        return <ContainerUpdate key={index} update={update} />
      return null;
    });
    
    return (
      <div className="history">        
        <a href="#" onClick={this.toggleHistory}>{this.state.shown ? "Hide" : "Show"} history</a>
        {this.state.shown &&
          <div className="updates">
            <table>
              <thead>
                <tr>
                  <th>Arrival</th>
                  <th>Delivery on</th>
                  <th>Line</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Vessel</th>
                  <th>Voyage</th>
                  <th>Vessel ETA</th>
                </tr>
              </thead>
              <tbody>
                {container_updates}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}


class ContainerUpdate extends Component {
  render(){
    return (
      <tr>
        <td>{this.props.update.arrival}</td>
        <td>{this.props.update.delivery_on}</td>
        <td>{this.props.update.steamship_line}</td>
        <td>{this.props.update.origin}</td>
        <td>{this.props.update.destination}</td>
        <td>{this.props.update.vessel}</td>
        <td>{this.props.update.voyage}</td>
        <td>{this.props.update.vessel_eta}</td>
      </tr>
    );
  }
}
