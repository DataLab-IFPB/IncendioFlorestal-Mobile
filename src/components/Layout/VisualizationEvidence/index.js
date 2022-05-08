import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const VisualizationEvidence = ({ content, visible, close }) => {
  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <View style={styles.containerVisualizationEvidenceVideo}>
        <View style={styles.headerCOntainerVIsualizationEvidenceVideo}>
          <TouchableOpacity>
            <IconAntDesign
              onPress={() => close()}
              name='closecircle'
              color={'#F00'}
              size={styles.iconClose}
            />
          </TouchableOpacity>
        </View>
        {content}
      </View>
    </Modal>
  );
};

export default VisualizationEvidence;
