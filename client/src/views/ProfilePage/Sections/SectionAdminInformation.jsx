import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
class SectionAdminInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      name: "",
      email: "",
      password: "",
      showPassword: false
    };
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          name: String(res.data.data.name),
          email: String(res.data.data.email)
        })
      );
  }
  onUpdate = () => {
    if (!window.confirm("ARE YOU SURE?")) return;
    let updated = {};
    if (!(this.state.name === ""))
      updated = { ...updated, name: this.state.name };
    if (!(this.state.email === ""))
      updated = { ...updated, email: this.state.email };
    if (!(this.state.password === ""))
      updated = { ...updated, password: this.state.password };
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/admin", updated, {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          name: String(res.data.data.name),
          email: String(res.data.data.email),
          password: ""
        })
      );
    window.location.replace("/profile-page");
    alert("Your profile information are updated successuflly");
  };
  onDelete = () => {
    if (!window.confirm("ARE YOU SURE?")) return;
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/profiles/admin", {
        headers: {
          Authorization: token
        }
      })
      .then(
        this.setState({
          name: "",
          email: ""
        })
      );
    cookies.set("token", undefined);
    cookies.set("usertype", undefined);
    window.location.replace("/");
    alert("WE ARE SORRY TO HEAR YOU GO!");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div id="project">
          <GridContainer justify="center">
            <Button
              color="info"
              size="lg"
              onClick={() => this.toggleModal("flag")}
            >
              Update Personal Information
            </Button>
            <Modal open={this.state.flag}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form}>
                      <CardHeader color="info" className={classes.cardHeader}>
                        <div className={classes.title}>
                          <h2>Personal Information</h2>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Name</InputLabel>
                          <Input
                            id="name"
                            type="name"
                            value={this.state.name}
                            onChange={this.handleChange("name")}
                            endAdornment={
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Email</InputLabel>
                          <Input
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange("email")}
                            endAdornment={
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Password</InputLabel>
                          <Input
                            id="password"
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state.password}
                            onChange={this.handleChange("password")}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          color="info"
                          size="lg"
                          onClick={() => this.onUpdate()}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          size="lg"
                          onClick={() => this.onDelete()}
                        >
                          Delete my profile
                        </Button>
                        <Button
                          simple
                          color="info"
                          size="lg"
                          onClick={() => this.toggleModal("flag")}
                        >
                          Close
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </Modal>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(productStyle)(SectionAdminInformation);
