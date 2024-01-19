import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Crew = ({ children, serie, movie, id }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      {serie.id === id ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CrewSerie', {
              title: serie.name,
              id: serie.id,
            })
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
      {movie.id === id ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CrewMovie', {
              title: movie.title,
              id: movie.id,
            })
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default Crew
