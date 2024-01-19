import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from '../utils/Responsive'

const Rate = ({ rate }) => {
  const percent = (rate * 10).toFixed(0);

  const rating = (percent) => {
    if (percent > 1 && percent <= 50) {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'red' }]}>
                <Text style={styles.textContent}>{percent}</Text>
            </View>
          )
    } else if (percent > 50 && percent <= 70) {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'orange' }]}>
                <Text style={styles.textContent}>{percent}</Text>
            </View>
          )
    } else if (percent > 70 && percent <= 100) {
      return (
        <View style={[styles.viewContainer, { backgroundColor: 'green' }]}>
            <Text style={styles.textContent}>{percent}</Text>
        </View>
      )
    } else {
      return <Text style={styles.textContent}>{percent}</Text>
    }
  };
  return rating(percent);
}

const styles = StyleSheet.create({
  viewContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    position: 'absolute',
    right: moderateScale(0),
    bottom: moderateScale(0)
  },
  textContent: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: moderateScale(20)
  }
})

export default Rate