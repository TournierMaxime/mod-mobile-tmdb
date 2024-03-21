import React from "react"
import tw from "twrnc"
import { Text, View } from "react-native"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"

class Series {
  static status = (data, t) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case "Returning Series":
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
            >
              {t("utils.returningSeries")}
            </Text>
          )
        case "Ended":
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
            >
              {t("utils.ended")}
            </Text>
          )
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

    return (
      <Accordion title={t("utils.diffusers")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {item.name}
              </Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCompanies = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t("utils.producers")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {item.name}
              </Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCountries = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t("utils.country")}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {item.name}
              </Text>
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
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4 ${text}`}>
          {t("utils.flatrate")}
        </Text>
        {data?.flatrate?.map((provider, index) => {
          return (
            <Text
              style={[
                tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
              key={index}
            >
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
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4 ${text}`}>
          {t("utils.buy")}
        </Text>
        {data?.buy?.map((provider, index) => {
          return (
            <Text
              style={[
                tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
              key={index}
            >
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

    return (
      <View>
        {data ? (
          <Text
            style={[tw`font-medium text-lg ml-4 ${text}`, { marginBottom: 15 }]}
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
    return data?.created_by
      ?.map((credit, index) => {
        if (!credit.name) return null
        return (
          <Text
            key={index}
            style={tw`font-medium text-lg rounded-sm m-1 px-4 text-center`}
          >
            {credit.name}
          </Text>
        )
      })
      .slice(0, 1)
  }

  static genres = (data) => {
    return data?.genres
      ?.map((genre, index) => (
        <Text
          key={index}
          style={tw`font-medium text-lg rounded-sm m-1 px-4 text-center`}
        >
          {genre.name + " "}
        </Text>
      ))
      .slice(0, 2)
  }

  static plot = (data, t, borderColor, text) => {
    if (!data) return null

    return (
      <View style={[tw`${borderColor}`, { borderTopWidth: 2 }]}>
        <Accordion title={t("utils.plot")}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>
              <Text
                style={tw`font-medium text-lg rounded-md mr-auto my-2 w-auto py-2 px-4 text-justify leading-7 ${text}`}
              >
                {data}
              </Text>
            </View>
          </View>
        </Accordion>
      </View>
    )
  }
}

export default Series
