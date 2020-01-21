import PropTypes from "prop-types";
import React, { Component } from "react";

import Typist from "react-typist";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Transition
} from "semantic-ui-react";

import "./home.css";
import Skills from "../components/home/skills/skills";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class HomepageHeading extends React.Component {
  state = {
    renderButton: false
  };



  render() {
    const { mobile } = this.props;
    return (
      <Container text>
        <Header
          as="h1"
          inverted
          style={{
            fontSize: mobile ? "2em" : "32pt",
            lineHeight: '36pt',

            margin: '0 0 20px 0',
            marginTop: mobile ? "1.5em" : "32pt"
          }}
        >
          {" "}
          {" "}

        </Header>
        <br />
        <Transition
          visible={this.state.renderButton}
          animation="scale"
          duration={500}
        >
          <Button size="huge" style={{ margin: "auto" }}>
            Check My Skills
            <Icon name="right arrow" />
          </Button>
        </Transition>
      </Container>
    );
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

class DesktopContainer extends Component {
  state = { renderButton: false };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  onHeaderTyped = () => {
    this.setState({ renderButton: true });
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;



    return (

      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}  >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <section id="home" className="flex height-fix">
            <div id="pt" className="canvas">
              <canvas id="canvas" width="1920" height="963" style={{ width: "1739px", height: "873px" }}></canvas>
              </div>
            <div className="flex">

              <div className="text">
                <Typist
                  cursor={{ hideWhenDone: true }}
                  onTypingDone={this.onHeaderTyped}
                >
                  Hello, I'm <span className="highlight">Ian Oliveira</span>.
                  <Typist.Delay ms={1000} />
                  <br />
                  I'm a full-stack web developer.
                  </Typist>
              </div>

              <Transition
                visible={this.state.renderButton}
                animation="scale"
                duration={500}
              >
                <div className="button" dest="about">
                  Check My Skills 
                </div>
              </Transition>


              <nav className="flex desk" >
                <div className="link-wrap">
                  <div className="page-link active" dest="home">home</div>
                  <div className="page-link" dest="portfolio">portfolio</div>
                  <div className="page-link" dest="skills">skills</div>
                  <div className="page-link" dest="personal-projects">personal projects</div>
                </div>
                <i className="mdi mdi-menu"></i>
              </nav>
            </div>
          </section>
        </Visibility>

        {children}
      </Responsive>

    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            HOME
          </Menu.Item>
          <Menu.Item as="a">SKILLS</Menu.Item>
          <Menu.Item as="a">WORK</Menu.Item>
          <Menu.Item as="a">PORTFOLIO</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h3" style={{ fontSize: "2em" }}>
              SKILLS
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Skills />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

   

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column  horizontal>
            
              <List link inverted horizontal>
                <List.Item as="a">Github</List.Item>
                <List.Item as="a">LinkedIn</List.Item>
                <List.Item as="a">Twitter</List.Item>
              </List>
            </Grid.Column>
          
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
