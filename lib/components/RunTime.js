import React, { Fragment } from 'react'
import { Text } from 'react-native'
import tw from 'twrnc'

const Runtime = ({ time, isMovie, t }) => {
  if (!time) return null

  let hours, minutes
  if (isMovie) {
    hours = Math.floor(time / 60)
    minutes = time % 60
  } else {
    hours = Math.floor(time / 60)
    minutes = time % 60
  }

  const hasHours = hours > 0

  const runtime = () => {
    if (time.length === 0) {
      return
    }
    return (
      <Fragment>
        {isMovie ? (
          <Text style={tw`font-medium text-xl text-white`}>
            {t('utils.duration')} {hasHours ? hours + 'H' : ''}
            {minutes}Min
          </Text>
        ) : (
          <Text style={tw`font-medium text-xl text-white`}>
            {t('utils.duration')} {hasHours ? hours + 'H' : ''}
            {minutes}Min / ep
          </Text>
        )}
      </Fragment>
    )
  }

  return runtime()
}

export default Runtime
