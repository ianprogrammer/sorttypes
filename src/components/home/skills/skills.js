import React from 'react'
import { Label, Progress } from 'semantic-ui-react'
import './skills.css'
import '../../../animate.css'
class Skills extends React.Component {
    state = {
        animate: this.props.animate
    }

    componentDidMount(){
        this.animateProgress(0, 70, "teal")
        this.animateProgress(1, 95, "green")
        this.animateProgress(2, 80, "red")
        this.animateProgress(3, 95, "orange")
        this.animateProgress(4, 85, "purple")
        this.animateProgress(5, 70, "pink")

        this.animateProgress(6, 90, "teal")
    }

animateProgress = (i, target, color) => {

        const bar = document.getElementsByClassName("ui progress")
        let progress = 0
        bar[i].className = bar[i].className + ' ' + color
        while (progress < target) {
            setTimeout(() => {
                bar[i].firstChild.style.width = `${progress}%`

            }, 1000)
            progress += 5

        }

    }

    render() {
        const { animate } = this.state
        console.log(animate)
        return (
            <div style={{ margin: "1em" }}  >

                <Label image  >
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png' alt="" />
                    React
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://img2.gratispng.com/20180425/jrw/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84e2a4242.1423638015246930701731.jpg' alt="" />
                    NodeJS
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png' alt="" />
                    Angular
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://img2.gratispng.com/20180705/jhx/kisspng-microsoft-sql-server-computer-servers-dblink-5b3ea014e90550.0487060715308308689545.jpg' alt="" />
                    SQL
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://img1.gratispng.com/20180831/bol/kisspng-c-programming-language-logo-microsoft-visual-stud-atlas-portfolio-5b8991925c19f7.9738748215357423543773.jpg' alt="" />
                    C#
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://miro.medium.com/max/400/1*nP2C50GK4_-ly_R_mq3juQ.png' alt="" />
                    GraphQL
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />

                <Label image  >
                    <img src='https://randock.com/wp-content/uploads/2018/01/restApi580.png' alt="" />
                    REST API
                </Label>
                <Progress style={{ margin: "1em 0 1em" }} />


            </div>
        )
    }

}



export default Skills