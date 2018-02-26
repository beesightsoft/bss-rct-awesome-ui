# BeeComponent
![npm](https://img.shields.io/npm/v/@beesight/component.svg) ![license](https://img.shields.io/npm/l/@beesight/component.svg)

Custom component to deal with crazy pressing by Tester. =]]
[![nodei.co](https://nodei.co/npm/@beesight/component.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@beesight/component)

Post: https://medium.com/p/142c75bf76b8

## How to use?
```javascript
import BeeComponent from '@beesight/component'


export default class MainScreen extends BeeComponent {
  render() {
    return (
      <Button onPress={() => {
                    this.onPressDelay(() => {
                      //TODO: call actual func here    
                    })
                  }} 
                >
                  <Text>Button 1</Text>
      </Button>    
    )
  }
}          
```