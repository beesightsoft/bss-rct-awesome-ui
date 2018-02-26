# BeeComponent

Custom Component deal with crazy pressing of Tester

Post: https://medium.com/p/142c75bf76b8

## How to use?
```
import BeeComponent from '@beesight/component'

<Button onPress={() => {
                  this.onPressDelay(() => {
                    //TODO: call actual func here    
                  })
                }} 
              bordered warning style={styles.button}>
                <Text>Button 1</Text>
</Button>              
```