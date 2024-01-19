import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Seasons = ({ serie, children }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AllSeasons', {
            title: serie.original_name,
            id: serie.id,
          })
        }
      >
        {serie ? children : null}
      </TouchableOpacity>
    </Fragment>
  )
}

export default Seasons
