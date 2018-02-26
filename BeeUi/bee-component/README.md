# BeeComponent

Custom component to deal with crazy pressing by Tester. =]]

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