import React, { Fragment } from "react"
import { View, Text } from "react-native"
import Utils from "@mod/mobile-common/lib/class/Utils"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import tw from "twrnc"
import moment from "moment"

class Movies {
  static productionCompanies = (data, t, borderColor, text) => {
    if (!data) return null
    return (
      <Accordion title={t("utils.producers")}>
        <View style={tw`flex flex-col`}>
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
        </View>
      </Accordion>
    )
  }

  static productionCountries = (data, t, borderColor, text) => {
    if (!data) return null
    return (
      <Accordion title={t("utils.country")}>
        <View style={tw`flex flex-col`}>
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
        </View>
      </Accordion>
    )
  }

  static releaseByCountry = (data, language, t) => {
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
    return (
      <Accordion title={t("utils.release")}>
        <View style={tw`flex flex-col`}>
          {data?.map((releaseDate, index) => {
            if (releaseDate.iso_3166_1 !== language) return null
            return (
              <View key={index}>
                {releaseDate.release_dates.map((releaseDate, index) => {
                  return (
                    <View style={tw`flex-col justify-between`} key={index}>
                      <Text
                        style={[
                          tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                          { color: "#495057", backgroundColor: "#dee2e6" },
                        ]}
                      >
                        {moment(releaseDate.release_date).format("L")}{" "}
                        {releaseDate.note
                          ? `- ${releaseDate.note}`
                          : `- ${t("utils.nationalRelease")}`}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  static budget = (data, t) => {
    if (!data) return null
    return (
      <Accordion title={t("utils.budget")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
            >
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
      </Accordion>
    )
  }

  static revenue = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t("utils.boxOffice")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: "#495057", backgroundColor: "#dee2e6" },
              ]}
            >
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
      </Accordion>
    )
  }

  static flatrate = (providers, languageKey, t, text) => {
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

    if (!providers?.[language]?.flatrate) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4 ${text}`}>
          {t("utils.flatrate")}
        </Text>
        {providers?.[language]?.flatrate?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  static buy = (providers, languageKey, t, text) => {
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
    if (!providers?.[language]?.buy) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4 ${text}`}>
          {t("utils.buy")}
        </Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  static rent = (providers, languageKey, t, text) => {
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
    if (!providers?.[language]?.rent) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4 ${text}`}>
          {t("utils.rent")}
        </Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: "#495057", backgroundColor: "#dee2e6" },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  static providersByCountry = (providers, language, t, text) => {
    if (!providers) {
      return null
    }

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

    return Object.keys(providers).length === 0 ? null : (
      <Accordion title={t("utils.available")}>
        <View style={tw`flex flex-col`}>
          <Text style={tw`font-medium text-lg ml-4 mb-4 ${text}`}>
            {t("utils.contentPoweredByJustWatch")}
          </Text>
          {this.flatrate(providers, language, t, text)}
          {this.buy(providers, language, t, text)}
          {this.rent(providers, language, t, text)}
        </View>
      </Accordion>
    )
  }

  static directors = (data) => {
    return (
      <Fragment>
        {" • "}
        {data?.crew?.map((credit, index) => {
          if (!credit.job === "Director") return null
          if (credit.job === "Director") {
            return (
              <Text
                key={index}
                style={tw`font-medium text-lg rounded-sm m-1 px-4 text-center`}
              >
                {credit.name}
              </Text>
            )
          }
        })}
      </Fragment>
    )
  }

  static genres = (data) => {
    return (
      <Fragment>
        {" • "}
        {data?.genres?.map((genre, index, array) => (
          <Text
            key={index}
            style={tw`font-medium text-lg rounded-sm m-1 px-4 text-center`}
          >
            {genre.name + (index < array.length - 1 ? ", " : "")}
          </Text>
        ))}
      </Fragment>
    )
  }

  static plot = (data, t, borderColor, text) => {
    if (!data) return null

    return (
      <View style={[tw`${borderColor}`, { borderTopWidth: 2 }]}>
        <Accordion title={t("utils.plot")}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>
              <Text
                style={tw`${text} font-medium text-lg rounded-md mr-auto my-2 w-auto px-4 text-justify leading-7`}
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

export default Movies
