import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from './Responsive'

export default function StatusSeries({ status }) {
    switch (status) {
        case 'Ended':
        return (
            <View style={styles.container}>
                <Text style={styles.ended}>Status Terminée</Text>
            </View>
        )
        case 'Returning Series':
        return <Text style={styles.returning}>Status Renouvelée</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    ended: {
        fontSize: moderateScale(12),
        borderRadius: moderateScale(100),
        margin: 5,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#E42200',
        marginLeft: 15
    },
    returning: {
        fontSize: moderateScale(12),
        borderRadius: 10,
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'green',
        marginLeft: 15
    }
})
