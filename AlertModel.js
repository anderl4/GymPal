import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const AlertModel = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 10 }}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10, backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: '#FFF' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModel;