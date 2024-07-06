import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';

export const MenuItem = ({ item, viewMode }) => {
  const [expanded, setExpanded] = useState(false);

  const renderClienteView = () => (
    <> 
    <Layout style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{`R$ ${item.price}`}</Text>
    </Layout>
    {expanded && <Text style={styles.description}>{item.description}</Text>}
    </>
  );

  const renderGarcomView = () => (
    <View style={styles.garcomContainer}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <Card onPress={() => setExpanded(!expanded)} style={styles.card}>
      {viewMode === 'cliente' ? renderClienteView() : renderGarcomView()}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    flex: 1,
  },
  price: {
    marginLeft: 16,
  },
  description: {
    marginTop: 8,
  },
});