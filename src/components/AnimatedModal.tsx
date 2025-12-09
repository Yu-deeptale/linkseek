import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

type AnimatedModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttonText?: string;
  onReset?: () => void;
};

export default function AnimatedModal({ 
  visible, 
  onClose, 
  title, 
  children, 
  buttonText = "決定",
  onReset
}: AnimatedModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleReset = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onReset) onReset();
   
    });
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
              {title && <Text style={styles.modalTitle}>{title}</Text>}
              
              <View style={styles.contentContainer}>
                {children}
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>{buttonText}</Text>
              </TouchableOpacity>

              {onReset && (
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                  <Text style={styles.resetButtonText}>リセット</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'NicoMoji',
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#00A3E3',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  closeButtonText: {
    fontFamily: 'NicoMoji',
    color: '#fff',
    fontSize: 20,
  },
  resetButton: {
    marginTop: 10,
    padding: 10,
  },
  resetButtonText: {
    fontFamily: 'NicoMoji',
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'underline',
  },
});