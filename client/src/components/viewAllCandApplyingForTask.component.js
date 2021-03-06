import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class viewAllCand extends Component {
  state = {
    announcements: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/consultancies/candidate/pendingTasks", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const announcements = res.data.data;
        this.setState({ announcements });
      });
  }

  render() {
    return (
      <ul>
        {this.state.announcements.map(person => (
          <li>
            <p>
              Announcement title: {person.title}
              <br />
              Announcement type: {person.type}
              <br />
              Announcement content: {person.content}
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
