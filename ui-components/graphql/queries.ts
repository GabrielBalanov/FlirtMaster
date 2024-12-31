/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      birthDate
      createdAt
      currentResidence
      facoriteMovie
      favoriteBook
      favoriteFood
      favoritePlaceToTravel
      favoriteSeries
      firstName
      height
      hobbies
      id
      lastName
      mostPopularDatingPlatform
      nativeTown
      occupation
      owner
      textingSkillRating
      updatedAt
      whyFavoritSeries
      whyFavoriteBook
      whyFavoriteFood
      whyFavoriteMovie
      whyFavoritePlaceToTravel
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        birthDate
        createdAt
        currentResidence
        facoriteMovie
        favoriteBook
        favoriteFood
        favoritePlaceToTravel
        favoriteSeries
        firstName
        height
        hobbies
        id
        lastName
        mostPopularDatingPlatform
        nativeTown
        occupation
        owner
        textingSkillRating
        updatedAt
        whyFavoritSeries
        whyFavoriteBook
        whyFavoriteFood
        whyFavoriteMovie
        whyFavoritePlaceToTravel
        __typename
      }
      nextToken
      __typename
    }
  }
`;
