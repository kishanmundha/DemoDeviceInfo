import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './HomeScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#607D8B',
    },
  },
  cardStyle: {
    backgroundColor: 'white'
  }
});

export default App;
