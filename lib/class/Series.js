import React from "react"
import tw from "twrnc"
import { Text, View } from "react-native"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

class Series {
  static status = (data, t) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    const statusSerie = () => {
      switch (data) {
        case "Returning Series":
          return (
            <Text style={accordionContent()}>{t("utils.returningSeries")}</Text>
          )
        case "Ended":
          return <Text style={accordionContent()}>{t("utils.ended")}</Text>
      }
    }

    return (
      <Accordion title={t("utils.status")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>{statusSerie()}</View>
        </View>
      </Accordion>
    )
  }

  static networks = (data, t) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.diffusers")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCompanies = (data, t) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.producers")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCountries = (data, t) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.country")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static flatrate = (data, languageKey, t, text) => {
    let language = languageKey

    switch (language) {
      case "EN-GB":
        language = "US"
        break
      case "ZH-CN":
        language = "CN"
        break
      case "JA":
        language = "JP"
        break
      case "KO":
        language = "KR"
        break
    }

    if (!data?.flatrate) {
      return null
    }
    const { accordionContent, fontSize } = useResponsive()
    return (
      <View>
        <Text
          style={[
            fontSize(text),
            {
              marginLeft: Utils.moderateScale(8),
            },
          ]}
        >
          {t("utils.flatrate")}
        </Text>
        {data?.flatrate?.map((provider, index) => {
          return (
            <Text style={accordionContent()} key={index}>
              {provider.provider_name}
            </Text>
          )
        })}
      </View>
    )
  }

  static buy = (data, languageKey, t, text) => {
    let language = languageKey

    switch (language) {
      case "EN-GB":
        language = "US"
        break
      case "ZH-CN":
        language = "CN"
        break
      case "JA":
        language = "JP"
        break
      case "KO":
        language = "KR"
        break
    }
    if (!data?.buy) {
      return null
    }
    const { accordionContent, fontSize } = useResponsive()
    return (
      <View>
        <Text
          style={[
            fontSize(text),
            {
              marginLeft: Utils.moderateScale(8),
            },
          ]}
        >
          {t("utils.buy")}
        </Text>
        {data?.buy?.map((provider, index) => {
          return (
            <Text style={accordionContent()} key={index}>
              {provider.provider_name}
            </Text>
          )
        })}
      </View>
    )
  }

  static providersByCountry = (data, lang, t, text) => {
    switch (lang) {
      case "EN-GB":
        lang = "US"
        break
      case "ZH-CN":
        lang = "CN"
        break
      case "JA":
        lang = "JP"
        break
      case "KO":
        lang = "KR"
        break
    }

    const { fontSize } = useResponsive()

    return (
      <View>
        {data ? (
          <Text
            style={[
              fontSize(text),
              {
                marginBottom: Utils.moderateScale(15),
                marginLeft: Utils.moderateScale(8),
              },
            ]}
          >
            {t("utils.contentPoweredByJustWatch")}
          </Text>
        ) : null}
        {this.flatrate(data, lang, t, text)}
        {this.buy(data, lang, t, text)}
      </View>
    )
  }

  static creators = (data) => {
    const { mediaTitle } = useResponsive()
    return data?.created_by
      ?.map((credit, index) => {
        if (!credit.name) return null
        return (
          <Text key={index} style={mediaTitle()}>
            {credit.name}
          </Text>
        )
      })
      .slice(0, 1)
  }

  static genres = (data) => {
    const { mediaTitle } = useResponsive()
    return data?.genres
      ?.map((genre, index) => (
        <Text key={index} style={mediaTitle()}>
          {genre.name + " "}
        </Text>
      ))
      .slice(0, 2)
  }

  static plot = (data, t, borderColor, text) => {
    if (!data) return null
    const { plotAndBio } = useResponsive()

    return (
      <View style={[tw`${borderColor}`, { borderTopWidth: 2 }]}>
        <Accordion title={t("utils.plot")}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>
              <Text style={plotAndBio(text)}>{data}</Text>
            </View>
          </View>
        </Accordion>
      </View>
    )
  }
}

export default Series
