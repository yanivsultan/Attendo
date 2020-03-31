import React from 'react'
import { Segment, Header, Container, Image, Button, Icon } from 'semantic-ui-react';

const HomePage = (props) => {
    return (<Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
              <Header as='h1' inverted>
                <Image
                  size='massive'
                  src='/assets/logo.png'
                  alt='logo'
                  style={{ marginBottom: 12 }}
                />
                Attendo
              </Header>
              <Button onClick={() => props.history.push('/events')} size='huge' inverted>
                Get started
                <Icon name='right arrow' inverted />
              </Button>
            </Container>
          </Segment>)
}

export default HomePage;
