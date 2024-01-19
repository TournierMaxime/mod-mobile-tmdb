import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc'

export default function StatusSeries({ status }) {
    switch (status) {
        case 'Ended':
        return (
            <View style={tw`flex`}>
                <Text style={[tw`font-medium text-lg rounded-md my-4 p-4 text-center text-white ml-4`, { backgroundColor: '#E42200' }]}>Status Terminée</Text>
            </View>
        )
        case 'Returning Series':
        return <Text style={tw`font-medium text-lg rounded-md p-4 text-center text-white ml-4 bg-green-500`}>Status Renouvelée</Text>
    }
}
