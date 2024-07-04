import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, ListItem, Icon, Text, TopNavigation, Layout } from '@ui-kitten/components';

const tables = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: `Mesa ${index + 1}`,
  description: 'Livre',
}));

export const HomeScreen = ({ navigation }) => {

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('BillNav', { screen: 'Bill', tableId: item.id })}
      style={styles.touchableArea}
      activeOpacity={0.7}
    >
      <View style={styles.listItem}>
        <Layout style={{ alignItems: 'center' }}>
          <Text style={styles.customTitle} category='s1'>
            {item.title}
          </Text>
          <Icon
            name='person'
            fill='#FFD700'
            style={styles.iconStyle}
          />
        </Layout>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title='Mesas'
        style={styles.pageTitle}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {tables.map(renderItem)}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
  },
  touchableArea: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#222B45',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  iconStyle: {
    width: 40,
    height: 20,
  },
  customTitle: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  pageTitle: {
    marginTop: 30,
  },
});
