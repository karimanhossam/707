import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class approvedtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get(
        "http://localhost:5000/api/candidates/approvedTasks" ,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
         
            const tasks = res.data.data;
            this.setState({ tasks });      
         
        
      });
  }

 
 
  render() {
    return (
      <ul>
        {this.state.tasks.map(task => (
          <li>
            <p>
              Name: {task.name}
              <br />
              Description: {task.description}
              <br />
              Type: {task.type}
              <br />
              Deadline: {task.deadline}
              <br />
              Hours: {task.hours}
              <br />
              Min Credits/Hr: {task.minCreditsHour}
              <br />
              Max Credits/Hr: {task.maxCreditsHour}
              <br />
              Chosen Credit Hour: {task.chosenCreditHour}
              <br />
              Penalty: {task.creditsPenalty}
              <br />
              Years of Experience: {task.yearsOfExperience}
              <br />
              Contract Signed: {task.contractSigned}
              <br />
              Candidate Role: {task.candidateRole}
              <br />
              Required Skills:{" "}
              {task.requiredSkills.map(requiredSkills => (
                <li>{requiredSkills}</li>
              ))}
              <br />
              Status: {task.status} <br />
              Life Cycle:{" "}
              {task.taskcycle.map(cycle => (
                <li>
                  Description: {cycle.description}
                  <br />
                  Status: {cycle.status}
                  <br />
                  Percentage: {cycle.percentage}
                </li>
              ))}
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit.bind(this, task._id)}
              >
              Update Lifecycle
              </button>
             
              <br />
              
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
