import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
        firstName: a.string(),
        lastName: a.string(),
        hobbies: a.string(),
        favoritePlaceToTravel: a.string(),
        whyFavoritePlaceToTravel: a.string(),
        favoriteFood: a.string(),
        whyFavoriteFood: a.string(),
        textingSkillRating: a.integer(),
        mostPopularDatingPlatform: a.string(),
        favoriteBook: a.string(),
        whyFavoriteBook: a.string(),
        facoriteMovie: a.string(),
        whyFavoriteMovie: a.string(),
        favoriteSeries: a.string(),
        whyFavoritSeries: a.string(),
        height: a.string(),
        occupation: a.string(),
        nativeTown: a.string(),
        currentResidence: a.string(),
        birthDate: a.date(),
        email: a.string()
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});