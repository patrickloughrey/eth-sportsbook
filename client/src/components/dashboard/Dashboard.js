import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
/* Odds API Dependencies */
const axios = require('axios')
const apiKey = require("../../config/keys.apiKey");

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  /* Retrieve Odds from Odds API */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        let sport_key = 'americanfootball_nfl'
        axios.get('https://api.the-odds-api.com/v3/odds', {
            params: {
              api_key: apiKey,
              sport: sport_key,
              region: 'us', // uk | us | au
              mkt: 'h2h' // h2h | spreads | totals
            }
            console.log(apiKey)
        }).then(response => {
            // odds_json['data'] contains a list of live and upcoming events and odds for different bookmakers.
            // Events are ordered by start time (live events are first)
            console.log(
                `Successfully got ${response.data.data.length} events`,
                `Here's the first event:`
            )
            console.log(JSON.stringify(response.data.data[0]))

            // Check your usage
            console.log()
            console.log('Remaining requests',response.headers['x-requests-remaining'])
            console.log('Used requests',response.headers['x-requests-used'])

      })
      .catch(error => {
          console.log('Error status', error.response.status)
          console.log(error.response.data)
      })

    }
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
