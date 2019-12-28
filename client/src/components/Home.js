import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

class Home extends Component {
    // constructor
    constructor(props) {
        super(props);

        // set state
        this.state = {loading: true};
    }

    componentDidMount() {
        console.log("in Home Component");
        this.fetchData()
    }

    fetchData(){
      fetch(`/api/test`)
      .then((data) => data.json())
      .then((data) => {
          console.log(data)
          this.setState({
            text: data.test_str,
            loading: false
          });
      })
    }

    render() {
      const loading = this.state.loading;
      // Render a spinner icon if loading
      if (loading) {
          return (
              <div className="text-center">
                <Spinner animation="grow" variant="warning" className="mx-auto" />
              </div>
          );
      }
      return (
        <React.Fragment>
          <div class="jumbotron bg-white text-dark">
            <div class="container">
              <h1 class="display-4">Connect Me with Spotify</h1>
              <h4 class="display-6">  </h4>
              <p class="lead">     </p>
              <p class="lead"> Connect with your friends and find out how much music you listen to in common! </p>
              <p class="lead">
                <a class="btn btn-primary btn-lg" href="/Dashboard" role="button">Find My Matches</a>
              </p>
            </div>
          </div>
          <div class="jumbotron bg-lightgrey text-dark">
            <div class="container">
              <h4 class="display-6">{this.state.text}</h4>
            </div>
          </div>
        </React.Fragment>
      );
    }
}

export default Home;
