import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RootNavigator } from './navigations/rootnavigator';
import { default as theme } from '../theme.json';
import AuthProvider from './context/auth';
import {NavigationContainer} from '@react-navigation/native'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <AuthProvider>
          <RootNavigator/>
      </AuthProvider>
    </ApplicationProvider>
  </>
);

