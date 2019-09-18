import React from "react"
import PropTypes from "prop-types"
class ReportManager extends React.Component {
  state = {report_status: ""};

  startJob = () => {
    console.log("Starting job");
    return fetch("http://localhost:3000/v1/start_job")
      .then(response => {
        return response.json();
      })
      .then( myJson => {
        console.log("Status: ", myJson.status);
      })
  }

  pollingAction = () => {
    console.log("polling for data");
    return fetch("http://localhost:3000/v1/poll")
      .then(response => {
        return response.json();
      })
      .then( myJSON => {
        const status = myJSON.status;
        if (status === "Nothing yet") {
          this.setState({report_status: "Loading ..."})
        }
        else { 
          this.setState({report_status: myJSON.status});
          console.log("stopping polling");
          clearInterval(this.dataPolling);
        }
      });
  }

  componentDidMount() {
    // this.dataPolling = setInterval( () => {
    //   this.pollingAction();
    // }, 5);
  }

  componentWillUnmount() {
    console.log("Component is unmounting AND stopping the poll");
    clearInterval(this.dataPolling);
  }

  startPolling = () => {
    console.log("Start polling");
    this.dataPolling = setInterval( () => {
      this.pollingAction();
    }, 5000);
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this.startJob}>Start Job</button><br />
        <button onClick={this.startPolling}>Start Polling</button> <br />
        Status: {this.state.report_status}
      </React.Fragment>
    );
  }
}

ReportManager.propTypes = {
  status: PropTypes.string
};
export default ReportManager
