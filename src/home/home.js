import _ from 'lodash'
import React, { Component } from 'react'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Icon,
    List,
    Menu,
    Segment,
    Visibility,
    Transition,
} from 'semantic-ui-react'
import Presentation from '../components/home/presentation/presentation'
import Skills from '../components/home/skills/skills'
import '../animate.css'
const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',

}




const Paragrafo = () => {
    return (
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    )
}




export default class Home extends Component {
    state = {
        menuFixed: false,
        overlayFixed: false,
        percentReact: 0
    }

    handleOverlayRef = (c) => {
        const { overlayRect } = this.state

        if (!overlayRect) {
            this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
        }
    }

    stickOverlay = () => this.setState({ overlayFixed: true })

    
    stickTopMenu = () => {
        this.setState({ menuFixed: true })



    }

    unStickOverlay = () => this.setState({ overlayFixed: false })

    unStickTopMenu = () => {
        this.setState({ menuFixed: false })
        

    }

    render() {
        const { menuFixed } = this.state
        return (
            <div>

                <Presentation />

                <Visibility
                    onTopPassed={this.stickTopMenu}
                    onTopVisible = {this.unStickTopMenu}
                    on
                    once={true}
                >

                    {/* {
                        (!menuFixed ? <Menu
                            borderless
                            fixed={menuFixed ? 'top' : undefined}
                            style={fixedMenuStyle}

                        >
                            <Container text>
                                <Menu.Item header>
                                    <Icon name="code" size="big" />
                                </Menu.Item>
                                <Menu.Item as='a'>Skills</Menu.Item>
                                <Menu.Item as='a'>About me</Menu.Item>

                                <Menu.Menu position='right'>
                                    <Dropdown text='Projects' pointing className='link item'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>SortTypes</Dropdown.Item>
                                            <Dropdown.Item>FindMe</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </Container>
                        </Menu> : null)

                    } */}

                     <Transition visible={menuFixed} animation='fade down' duration={300}>

                        <Menu
                            borderless
                            fixed={menuFixed ? 'top' : undefined}
                            style={fixedMenuStyle}

                        >
                            <Container text>
                                <Menu.Item header>
                                    <Icon name="code" size="big" />
                                </Menu.Item>
                                <Menu.Item as='a'>Skills</Menu.Item>
                                <Menu.Item as='a'>About me</Menu.Item>

                                <Menu.Menu position='right'>
                                    <Dropdown text='Projects' pointing className='link item'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>SortTypes</Dropdown.Item>
                                            <Dropdown.Item>FindMe</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </Container>
                        </Menu>
                    </Transition> 
                </Visibility>

                <Container style={{ marginTop: '5em' }}>


                    <Grid columns={2}>

                        <Grid.Column>
                          <div  hidden={!menuFixed} className={menuFixed ? "animated bounceInRight" : '' } >
                                <Skills animate={menuFixed} />
                          </div>
                           
                            
                           

                        </Grid.Column>
                        <Grid.Column >
                        
                        <div  hidden={!menuFixed} className={menuFixed ? "animated bounceInLeft" : '' } >
                                <Skills animate={menuFixed} />
                          </div>
                      
                        </Grid.Column>


                    </Grid>













                </Container>

                <Segment inverted style={{ margin: '1em 0em 0em', padding: '5em 0em' }} vertical>
                    <Container textAlign='center'>
                        <Grid columns={1} stackable inverted>
                            <Grid.Row>
                                <Grid.Column>

                                </Grid.Column>
                                <Grid.Column>
                                    {/* <Header inverted as='h4' content='Group 2' /> */}
                                    <List link inverted horizontal>
                                        <List.Item >  <Icon name="github" /><a href="https://github.com/ianprogrammer" >  Github </a> </List.Item>
                                        <List.Item  > <Icon name="twitter" /><a href="https://github.com/ianprogrammer" >  Twitter </a> </List.Item>
                                        <List.Item ><Icon name="linkedin" /><a href="https://github.com/ianprogrammer" >  LinkedIn </a></List.Item>

                                    </List>
                                </Grid.Column>
                                <Grid.Column>

                                </Grid.Column>

                            </Grid.Row>
                        </Grid>
                        <Divider inverted section />
                        <Icon name="code" size="big" />

                    </Container>
                </Segment>
            </div>
        )
    }
}