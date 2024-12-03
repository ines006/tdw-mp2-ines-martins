import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
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
  color: #2c3e50;
  font-weight: bold;
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

const About = () => {
  return (
    <AboutContainer>
      <Title>About the App</Title>
      <Paragraph>
        Pet App is a front-end application built with React to consume and display 
        information from a public data source. This app was developed as part of a 
        mini-project for the Web Technologies and Development course at the University 
        of Aveiro. The application showcases a complete list of dog and cat breeds, along 
        with their main characteristics. To achieve this, the following APIs were used: 
        <Link href="https://thedogapi.com/" target="_blank"> The Dog API</Link> and  
        <Link href="https://thecatapi.com/" target="_blank"> The Cat API</Link>.
      </Paragraph>
    </AboutContainer>
  );
};

export default About;
