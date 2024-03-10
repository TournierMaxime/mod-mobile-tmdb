import React, { Fragment } from 'react'
import { Text, Linking } from 'react-native'
import tw from 'twrnc'
import moment from 'moment'

class People {
  static currentAge = (people, t) => {
    const currentYear = moment().format('YYYY')
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const currentAge = currentYear - yearBirthDay

    return (
      <Fragment>
        {' • '}
        <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
          {t('utils.age')} {currentAge} {t('utils.years')}
        </Text>
      </Fragment>
    )
  }

  static ageDeath = (people, t) => {
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const yearDeathDay = moment(people.deathday).format('YYYY')
    const ageDeath = yearDeathDay - yearBirthDay

    return (
      <Fragment>
        {' • '}
        <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
          {t('utils.deadAt')} {ageDeath} {t('utils.years')}
        </Text>
      </Fragment>
    )
  }

  static birth = (people, t, i18n) => {
    const birthDay = moment(people.birthday).locale(i18n.language).format('LL')
    const placeOfBirth = people.place_of_birth
    const gender = people.gender

    if (gender === 1) {
      return (
        <Fragment>
          {' • '}
          <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
            {t('utils.born')} {birthDay} {t('utils.at')} {placeOfBirth}
          </Text>
        </Fragment>
      )
    } else if (gender === 2) {
      return (
        <Fragment>
          {' • '}
          <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
            {t('utils.born')} {birthDay} {t('utils.at')} {placeOfBirth}
          </Text>
        </Fragment>
      )
    }
  }

  static imdb = (people) => {
    if (!people.imdb_id) return null
    const url = `https://www.imdb.com/name/${people.imdb_id}`
    Linking.openURL(url)
  }
}

export default People
