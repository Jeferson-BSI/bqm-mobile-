
import React from 'react';
import home from '../pages/home';
import { createStackNavigator } from '@react-navigation/stack'; 

const AppStack = createStackNavigator();

const AppRoutes = () => (
    <AppStack.Navigator>
        <AppStack.Screen
            name='Home'
            component={Home}
        />
    </AppStack.Navigator>
);


export default AppRoutes;