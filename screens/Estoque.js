import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Modal, View, Animated, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Estoque({ navigation }) {
  const [value, setValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [quantidade, setQuantidade] = useState("");
<<<<<<< HEAD

  const salvarTexto = async () => {
    if (selected) {
      try {
        const lista = [...value, selected];
        await AsyncStorage.setItem('salvadoPae', JSON.stringify(lista));
        setValue(lista);
        setSelected('');
=======
  const [medida, setMedida] = useState("");

  const salvarTexto = async () => {
    if (selected && quantidade && medida) {
      try {
        const novoItem = { nome: selected, quantidade: quantidade, medida: medida };
        const lista = [...value, novoItem];
        await AsyncStorage.setItem('salvadoPae', JSON.stringify(lista));
        setValue(lista);
        setSelected('');
        setQuantidade('');
        setMedida('');
>>>>>>> b8b41ce (1.4)
      } catch (error) {
        console.error('Erro ao salvar item:', error);
      }
    }
  };

  const mostrarTexto = async () => {
    const response = await AsyncStorage.getItem('salvadoPae');
    const parsedItem = JSON.parse(response);
    if (parsedItem) {
      setValue(parsedItem);
    }
  };

  useEffect(() => {
    mostrarTexto();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10, padding: 15 }} onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderRightActions = (dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0, 100, 101],
      outputRange: [1, 0, 0, 1],
    });

    return (
      <TouchableOpacity style={styles.swapEfeito} onPress={() => deletarItem(index)}>
        <Animated.View style={{ transform: [{ translateX: trans }] }}>
          <View style={{ padding: 10 }}>
            <FontAwesome name="trash-o" size={24} color="black" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const deletarItem = (index) => {
    const posicaoItem = value.filter((_, i) => i !== index);
    setValue(posicaoItem);
    AsyncStorage.setItem('salvadoPae', JSON.stringify(posicaoItem));
  };

  const itensAlimento = [
    { key: '1', value: 'Macarrão' },
    { key: '2', value: 'Leite' },
    { key: '3', value: 'Feijão' },
    { key: '4', value: 'Arroz' },
    { key: '5', value: 'Farinha' },
  ];

  const itensMedida = [
    { key: '1', value: 'Kg' },
    { key: '2', value: 'T' },
  ];

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.viewX}>
                <Text style={styles.modalText}>Guardar suprimento</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <SelectList
                setSelected={(item) => setSelected(item)}
                data={itensAlimento}
                save="value"
                placeholder="Selecione um suprimento"
                searchPlaceholder="Buscar"
              />
              <View style={styles.row}>
                <View>
                  <TextInput
                    style={styles.inputQuantidade}
                    keyboardType='numeric'
                    placeholder='Quantidade'
                    value={quantidade}
                    onChangeText={(text) => setQuantidade(text.replace(/[^0-9]/g, ''))}
                    maxLength={3}
                  />
                </View>
                <View>
                  <SelectList
<<<<<<< HEAD
                    setSelected={(medida) => setSelected(medida)}
=======
                    setSelected={(medida) => setMedida(medida)}
>>>>>>> b8b41ce (1.4)
                    data={itensMedida}
                    save="value"
                    placeholder="Medida"
                    search={false}
                    boxStyles={styles.inputMedida}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={() => {
                  salvarTexto();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.salvarTexto}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={styles.textoDefault}>Controle de estoque:</Text>
      {Array.isArray(value) && value.map((item, index) => (
        <Swipeable renderRightActions={(dragX) => renderRightActions(dragX, index)} key={index}>
          <View style={styles.itemArray}>
<<<<<<< HEAD
            <Text style={styles.textoOutput}>{item}</Text>
=======
            <Text style={styles.textoOutput}>{item.nome} - {item.quantidade} {item.medida}</Text>
>>>>>>> b8b41ce (1.4)
          </View>
        </Swipeable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  caixaTexto: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  textoDefault: {
    textAlign: 'center',
    paddingTop: 30,
  },
  textoOutput: {
    marginLeft: 20,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemArray: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  botaoSalvar: {
    marginTop: 8,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0095ee',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  salvarTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalText: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  viewX: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 12,
  },
  swapEfeito: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightcoral',
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputQuantidade: {
    marginTop: 8,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9f9f9f',
    padding: 10,
    height: 44,
  },
  inputMedida: {
    marginTop: 8,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9f9f9f',
    padding: 10,
    height: 44,
    justifyContent: 'center',
  }
});
