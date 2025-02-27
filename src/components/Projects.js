import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg7 from "../assets/img/project-img7.jpg";
import projImg5 from "../assets/img/project-img5.jpg";
import projImg6 from "../assets/img/project-img6.jpeg";
import projImg8 from "../assets/img/project-img8.png";
import projImg9 from "../assets/img/project-img9.png";
import projImg10 from "../assets/img/project-img10.jpeg";
import projImg11 from "../assets/img/project-img11.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
export const Projects = () => {

        const projects = [
            {
            title: "Marvel Dashboard",
            description: "Web Development",
            imgUrl: projImg11,
            url:"https://github.com/Elias0305Ha/Marvel-Dashboard"
            },
            {
            title: "Application Tracker",
            description: "web Development",
            imgUrl: projImg5,
            url:"https://github.com/Elias0305Ha/Job Application Tracker"
            },
            {
              title: "Music Chat App",
              description: "Android Development",
              imgUrl: projImg8,
              url:"https://github.com/Android-Dev10/Music-Chat"
              },
              {
              title: "Pastagram",
              description: "Android Development",
              imgUrl: projImg7,
              url:"https://github.com/Elias0305Ha/parstagram"
              },
              {
              title: "Simple Tweet",
              description: "Android Development",
              imgUrl: projImg6,
              url:"https://github.com/Elias0305Ha/SimpleTweet"
              },
    
              {
                title: "Flixter",
                description: "Android Development",
                imgUrl: projImg9,
                url:"https://github.com/Elias0305Ha/Flix"
                },
        ];

        const androidProjects = [
          {
            
          }
      ];

      const gameProject = [
        {
        title: "First-Person Shooter ",
        description: "Game Development",
        imgUrl: projImg10,
        url:""
        },
  
    ];


    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                        <h2>Projects</h2>
                        <p>Explore my recent projects showcasing skills in web, mobile, and game development, where I create interactive, user-focused applications that solve real-world problems.</p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Web & Android</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Game</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Machine Learning</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                                <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          androidProjects.map((project, index) => {
                            return (
                                <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          gameProject.map((project, index) => {
                            return (
                                <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>

                
                  </Tab.Content>
                </Tab.Container>      
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>

    
    )


    
}

