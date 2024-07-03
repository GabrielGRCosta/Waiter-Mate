import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, ListItem, Icon, Text, TopNavigation } from '@ui-kitten/components';

const tables = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: `Mesa ${index + 1}`,
  description: 'Livre',
}));

export const HomeScreen = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Bill', { tableId: item.id })}>
      <ListItem
        title={() => (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.customTitle}>
              {item.title}
            </Text>
            <Icon
              name='person'
              fill='#FFFFFF'
              style={styles.iconStyle}
            />
          </View>
        )}
        style={styles.listItem}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <TopNavigation
        alignment='center'
        title='Mesas'
        style={styles.pageTitle}
      />
      <FlatList
        data={tables}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={styles.listContentContainer}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
  },
  listItem: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  iconStyle: {
    width: 40,
    height: 20,
    //alignSelf: 'center',
  },
  customTitle: {
    marginBottom:10
  },
  pageTitle: {
    marginTop: 30,
  },
});
