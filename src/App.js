import React, { Component, createRef } from "react";
import styled from "styled-components";
import GaMing from "./assets/GaMingChan.jpg";
import Jenny from "./assets/Jenny.jpg";
import Mike from "./assets/Mike.jpg";
import John from "./assets/JohnM.jpg";
import Matt from "./assets/Matt.jpg";
import Liam from "./assets/liam.jpg";
import Ava from "./assets/avatar-default.jpg";
import CN from "./assets/vle-codenation-logo-white-300x47.png";
import Arrow from "./assets/arr.png";
import Back from "./assets/back.png";
import Git from "./assets/github.svg";
import LI from "./assets/linkedin.svg";
import "./App.css";
import { content } from "./content/content";

class App extends Component {
  state = {
    selected: null,
    ref: createRef(),
    showBack: false,
    devs: [
      {
        name: "Ga Ming Chan",
        pic: GaMing,
        selected: false,
        github: "https://github.com/gxc19?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/gmchan19/",
      },
      {
        name: "Jenny Collings",
        pic: Jenny,
        selected: false,
        github: "https://github.com/jenny33141?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/jenny-collings-95a684199",
      },
      {
        name: "Michael Clare",
        pic: Mike,
        selected: false,
        github: "https://github.com/mclarework?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/mike-clare/",
      },
      {
        name: "John Muir",
        pic: John,
        selected: false,
        github: "https://github.com/johnmuir2001?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/john-muir-118ab11a2/",
      },
      {
        name: "Matthew Edge",
        pic: Matt,
        selected: false,
        github: "https://github.com/mjedg3?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/matthew-james-edge/",
      },
      {
        name: "Liam Southall",
        pic: Liam,
        selected: false,
        github: "https://github.com/liamsouthall?tab=repositories",
        linkedIn: "https://www.linkedin.com/in/liam-southall-2919031a2/",
      },
    ],
  };

  scrollRight = () => {
    const tempScroll = this.state.ref;
    tempScroll.current.scrollLeft += 200;
    this.setState({ ref: tempScroll });
  };
  scrollLeft = () => {
    const tempScroll = this.state.ref;
    tempScroll.current.scrollLeft -= 200;
    this.setState({ ref: tempScroll });
  };

  componentDidMount() {
    this.state.ref.current.addEventListener("scroll", () => {
      if (!this.state.showBack && this.state.ref.current.scrollLeft > 50) {
        this.setState({ showBack: true });
      } else if (this.state.showBack && this.state.ref.current.scrollLeft <= 50) {
        this.setState({ showBack: false });
      }
    });
  }

  handleSelected = (index) => {
    const temp = [...this.state.devs];
    temp.forEach((dev) => (dev.selected = false));
    temp[index].selected = true;
    this.setState({ selected: index, devs: temp });
  };
  render() {
    console.log(this.state);
    const { devs, selected } = this.state;
    return (
      <Container>
        <Hero selected={selected}>
          <Logo src={CN} />
          <Title selected={selected}>
            Junior Developers <span style={{ color: "#F5B32E" }}>: </span>Chester Talent Pool
          </Title>
        </Hero>
        <Avatars ref={this.state.ref}>
          {this.state.devs.map((dev, index) => {
            return (
              <Avatar key={index} clicked={this.state.devs[index].selected}>
                <DevImg
                  src={dev.pic}
                  onClick={() => this.handleSelected(index)}
                  clicked={this.state.devs[index].selected}
                />
              </Avatar>
            );
          })}
        </Avatars>
        <Strip>
          <img
            style={{ height: "20px", width: "auto", margin: "0 10px 0 20px", opacity: this.state.showBack ? "1" : "0" }}
            src={Back}
            onClick={() => this.scrollLeft()}
          />
          <LeftScroll>
            <Scroll>Scroll</Scroll>
            <img
              style={{
                height: "20px",
                width: "auto",
                margin: "0 30px 0 10px",
              }}
              src={Arrow}
              onClick={() => this.scrollRight()}
            />
          </LeftScroll>
        </Strip>
        {selected != null ? (
          <Name>{devs[selected].name}</Name>
        ) : (
          <Name>Please select a developer to find out more...</Name>
        )}
        {selected != null && (
          <div>
            <Github href={devs[selected].github}>
              <Icon src={Git} />
            </Github>
            <LinkedIn href={devs[selected].linkedIn}>
              <Icon src={LI} />
            </LinkedIn>
            <Desc>{content[selected]}</Desc>
          </div>
        )}
      </Container>
    );
  }
}

export default App;

const Container = styled.div`
  background-color: #282c34;
  height: 100%;
  width: 100vw;
  margin-bottom: 100px;
`;

const Hero = styled.div`
  width: 100%;
  height: ${({ selected }) => (selected != null ? "100px" : "200px")};
  display: flex;
  transition: all 1s;
  justify-content: space-between;
  @media screen and (max-width: 809px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
`;

const Logo = styled.img`
  margin-top: 35px;
  margin-left: 40px;
  width: 300px;
  height: 50px;
  @media screen and (max-width: 809px) {
    margin-left: 0;
  }
`;

const Title = styled.h1`
  color: white;
  transition: all 1s;
  font-size: ${({ selected }) => (selected != null ? "2em" : "3em")};
  width: 50%;
  text-align: right;
  margin-right: 30px;
  @media screen and (max-width: 809px) {
    font-size: 1em;
    margin-right: 0;
    text-align: center;
  }
`;

const Avatars = styled.div`
  width: 100%;
  margin-right: 10px;
  height: 210px;
  scroll-behavior: smooth;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  overflow: auto;
  white-space: nowrap;
`;

const Avatar = styled.div`
  min-height: ${({ clicked }) => (clicked ? "200px" : "150px")};
  min-width: ${({ clicked }) => (clicked ? "200px" : "150px")};
  margin: 0 25px;
  border-radius: 10px;
  transition: all 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.4);
  scroll-snap-align: start;

  &:hover {
    min-height: 200px;
    min-width: 200px;
  }
`;

const DevImg = styled.img`
  height: ${({ clicked }) => (clicked ? "200px" : "150px")};
  width: auto;
  transition: all 1s;
  &:hover {
    height: 200px;
    width: auto;
  }
`;

const Selected = styled.div``;

const Name = styled.h1`
  color: #f5b32e;
  margin-left: 20px;
  font-size: 3em;
  @media screen and (max-width: 809px) {
    font-size: 2em;
  }
`;

const Desc = styled.p`
  white-space: pre-wrap;
  color: white;
  max-width: 700px;
  margin-left: 20px;
  margin-bottom: 100px;
  @media screen and (max-width: 809px) {
    margin-right: 20px;
  }
`;

const Strip = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  opacity: 0;
  @media screen and (max-width: 1350px) {
    opacity: 1;
  }
`;

const Scroll = styled.p`
  color: white;
  margin: 0;
  padding: 0;
`;

const LeftScroll = styled.div`
  display: flex;
`;

const Github = styled.a``;

const LinkedIn = styled.a``;

const Icon = styled.img`
  height: 30px;
  width: auto;
  margin-left: 20px;
`;
