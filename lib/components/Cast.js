import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Cast = ({ children, serie, movie, id, people }) => {
  const navigation = useNavigation()

  return (
    <Fragment>
      {serie.id === id ? (
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('CastSerie', {
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
          onPress={async () => {
            navigation.navigate('CastMovie', {
              title: movie.title,
              id: movie.id,
            })
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
      {people.id === id ? (
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('CastPeople', {
              name: people.name,
              id: people.id,
            })
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default Cast
