import React, { Fragment, useState, memo } from 'react'
import { View, Text } from 'react-native'
import Utils from '@mod/mobile-common/lib/class/Utils'
import ModalComponent from '@mod/mobile-common/lib/components/utils/ModalComponent'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const OverView = ({ content, isBiography, t }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  const textOverview = tw`text-white text-justify mt-4 font-medium text-lg leading-2`

  if (!content) return null
  return (
    <Fragment>
      <View style={[tw`h-full flex-col flex absolute bottom-0 justify-end items-start m-4`, { width: '90%' }]}>
        <Text style={tw`font-medium text-xl text-white mt-4`}>
          {isBiography === true ? t('utils.biography') : t('utils.plot')}
        </Text>
          {Utils.truncateOverview(
            content,
            handleModal,
            t,
            textOverview,
            language === 'zh-cn' || language === 'ko' || language === 'ja'
              ? 150
              : 150
          )}
      </View>
      <ModalComponent
        title={isBiography === true ? t('utils.biography') : t('utils.plot')}
        content={content}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </Fragment>
  )
}

export default memo(OverView)
