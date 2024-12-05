import React from "react";
import styled from "styled-components";
import imgReact from '../assets/react.png';
import imgRedux from '../assets/redux.png';
import imgStyledComp from '../assets/styled-components.png';
import imgGitHub from '../assets/github.png';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  margin-top: 65px;
  color: #2c3e50;
  font-weight: bold;
`;

const SecTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  color: #555;
`;

const Link = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const TechList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 20px auto;
  text-align: left;
  max-width: 800px;
`;

const TechListItem = styled.li`
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 40px 0;
  max-width: 400px;
  justify-items: center;
`;

const ImageItemWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover div {
    opacity: 1;
  }
`;

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const RepositorySection = styled.div`
  margin-top: 20px;
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>Concept</Title>
      <Paragraph>
        Pet App is a front-end application built with React to consume and display 
        information from a public data source. This app was developed as part of a 
        mini-project for the Web Technologies and Development course at the University 
        of Aveiro. The application showcases a complete list of dog and cat breeds, along 
        with their main characteristics. To achieve this, the following APIs were used: 
        <Link href="https://thedogapi.com/" target="_blank"> The Dog API</Link> and  
        <Link href="https://thecatapi.com/" target="_blank"> The Cat API</Link>.
      </Paragraph>

      <Title>Technologies</Title>
      <TechList>
        <TechListItem>React for building the interface</TechListItem>
        <TechListItem>Create React App for initializing the project</TechListItem>
        <TechListItem>Styled Components for styling the application</TechListItem>
        <TechListItem>Prop Types for validating the types of data passed as props</TechListItem>
        <TechListItem>React Router for implementing navigation between pages</TechListItem>
        <TechListItem>Redux and Redux Toolkit for managing the application's state</TechListItem>
        <TechListItem>RTK Query for consuming APIs</TechListItem>
        <TechListItem>GitHub Actions for configuring and running CI/CD pipelines</TechListItem>
      </TechList>

      <ImageGrid>
        <ImageItemWrapper>
          <ImageItem src={imgReact} alt="React" />
          <ImageOverlay>React</ImageOverlay>
        </ImageItemWrapper>
        <ImageItemWrapper>
          <ImageItem src={imgRedux} alt="Redux" />
          <ImageOverlay>Redux</ImageOverlay>
        </ImageItemWrapper>
        <ImageItemWrapper>
          <ImageItem src={imgStyledComp} alt="Styled Components" />
          <ImageOverlay>Styled Components</ImageOverlay>
        </ImageItemWrapper>
        <ImageItemWrapper>
          <ImageItem src={imgGitHub} alt="GitHub" />
          <ImageOverlay>GitHub</ImageOverlay>
        </ImageItemWrapper>
      </ImageGrid>

      <RepositorySection>
        <SecTitle>Repository</SecTitle>
        <Link href="https://github.com/ines006/tdw-mp2-ines-martins" target="_blank">
          ines006/tdw-mp2-ines-martins
        </Link>
      </RepositorySection>
    </AboutContainer>
  );
};

export default About;
