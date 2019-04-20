import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getAnnouncementbyID_Consultant extends Component {

    state = {
        announcements: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/announcements", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const announcements = res.data.data;
            this.setState({ announcements });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/consultancies/announcement/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const announcements = res.data.data;
            this.setState({announcements:[announcements]})
            console.log(announcements);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/consultancies/announcement/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const certificates = [res.data.data];

            this.setState({ certificates });

            console.log(certificates);

          })

      }
      render() {
        return (
          <ul>
            { this.state.announcements.map(person => <li>
                <p>
                Announcement title: {person.title}<br></br> 
                Announcement type: {person.type}<br></br>  
                
            <button type="button" className="btn btn-success" onClick={this.onSubmit.bind(this, person._id)}>Get announcement</button><br></br>
            </p>   </li>)}
          </ul>
        )
      }
    

}