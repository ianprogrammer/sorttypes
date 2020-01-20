import React from 'react'
import Typist from 'react-typist';
import './presentation.scss'
import { Button, Transition } from 'semantic-ui-react'



class Presentation extends React.Component {
  state = {
    renderButton: false,
  }

  onHeaderTyped = () => {
    this.setState({ renderButton: true });
  }
  render() {

    return (
      <div className="modal-wrap">
        
        <div className="flex">

          <div className="TypistExample">

            <div className="TypistExample-content">

              <Typist
                className="TypistExample-message"
                cursor={{ hideWhenDone: true }}
                onTypingDone={this.onHeaderTyped}
              >
                Hello, I'm <strong>Ian Oliveira</strong>
                <br />
                <br />
                <br />
                <Typist.Delay ms={1250} />
                <br />
                Are you looking for a back-end<Typist.Delay ms={500} />
                <Typist.Backspace count={8} delay={1000} />
                <Typist.Delay ms={750} />
                front-end<Typist.Delay ms={500} />
                <Typist.Backspace count={9} delay={1000} />
                <Typist.Delay ms={750} />
                <strong>full-stack</strong> developer?
                <br />
                <br />
              </Typist>

            </div>
          </div>
        </div>
        <Transition visible={this.state.renderButton} animation='scale' duration={500}>
          <Button inverted style={{ marginTop: '50px' }} >Check my skills</Button>
        </Transition>
      </div>

    )
  }
}




export default Presentation