import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Layout, Text, Card, Icon } from '@ui-kitten/components';

export const MenuItem = ({ item, viewMode, onEdit, onDelete,role }) => {
  const [expanded, setExpanded] = useState(false);

  const renderClienteView = () => (
    <> 
      <Layout style={styles.container}>
        <Image source={{ uri: `data:image/png;base64,${item.imagem}` }} style={styles.image} />
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>{`R$ ${item.preco}`}</Text>
        {role === 'gerente' ? 
          <>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Icon name="edit-outline" fill="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <Icon name="trash-2-outline" fill="#000" style={styles.icon} />
          </TouchableOpacity>
        </>
        : <></>}
      </Layout>
      {expanded && <Text style={styles.description}>{item.descricao}</Text>}
    </>
  );

  const renderGarcomView = () => (
    <View style={styles.garcomContainer}>
      <Text style={styles.name}>{item.nome}</Text>
      {role === 'gerente' ? 
          <>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Icon name="edit-outline" fill="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <Icon name="trash-2-outline" fill="#000" style={styles.icon} />
          </TouchableOpacity>
        </>
        : <></>}
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
    marginVertical: 0
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  garcomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});