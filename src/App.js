import React from 'react';
import { LogBox } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RootNavigator } from './navigations/rootnavigator';
import { default as theme } from '../theme.json';
import AuthProvider from './context/auth';
import PreferencesProvider, { PreferencesContext } from './context/preferences';

LogBox.ignoreAllLogs();

const ApplicationWrapper = () => {
  const { darkTheme } = React.useContext(PreferencesContext);

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...(darkTheme ? eva.dark : eva.light), ...theme }}>
      <AuthProvider>
        <RootNavigator/>
      </AuthProvider>
    </ApplicationProvider>
    </>
  );
}

export default () => {
  return (
    <>
      <PreferencesProvider>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationWrapper />
      </PreferencesProvider>
    </>
  );
}
