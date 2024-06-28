import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button>WAITERMATE</Button>
    </Layout>
  </ApplicationProvider>
);