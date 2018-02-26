import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base'
import BeeHello from '@beesight/hello'
import BeeComponent from '@beesight/component'

import styles from './Main.Styles'

export default class MainScreen extends BeeComponent {

  constructor(props) {
    super(props)
    this.state = {
      btn1: 0,
      btn2: 0,
      log: ''
    }
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>MainScreen</Title>
          </Body>
        </Header>
        <View style={[styles.container, { flexDirection: 'column' }]}>
          <Text>{this.state.log}</Text>
          <View style={styles.container}>
            <View style={styles.center}>
              <Text>{this.state.btn1}</Text>
              <View><Button onPress={() => {
                this.onPressDelay(() => {
                  this.setState({
                    btn1: this.state.btn1 + 1,
                    log: 'setState1: ' + this.state.btn1
                  })
                })

              }} bordered warning style={styles.button}>
                <Text>Button 1</Text>
              </Button></View>
            </View>
            <View style={styles.center}>
              <Text>{this.state.btn2}</Text>
              <View><Button onPress={() => {
                this.onPressDelay(() => {
                  this.setState({
                    btn2: this.state.btn2 + 1,
                    log: 'setState2: ' + this.state.btn2
                  })
                })
              }} bordered danger style={styles.button}>
                <Text>Button 2</Text>
              </Button></View>
            </View>

          </View>
        </View>
      </Container>
    )
  }
}
