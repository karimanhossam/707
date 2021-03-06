import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class consultancyupdateskills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Skills: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (usertype !== "consultancy") {
      alert("Invalid Access");
      window.location.replace("/");
    } else
      axios
        .get(
          "http://localhost:5000/api/consultancies/acquiredCertificates/skills",
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res =>
          this.setState({
            Skills: res.data.data
          })
        );
  }
  render() {
    return (
      <ul>
        {this.state.Skills.map(requiredSkills => {
          return <li>{requiredSkills}</li>;
        })}
      </ul>
    );
  }
}
