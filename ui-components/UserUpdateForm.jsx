/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUser } from "./graphql/queries";
import { updateUser } from "./graphql/mutations";
const client = generateClient();
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    hobbies: "",
    favoritePlaceToTravel: "",
    whyFavoritePlaceToTravel: "",
    favoriteFood: "",
    whyFavoriteFood: "",
    textingSkillRating: "",
    mostPopularDatingPlatform: "",
    favoriteBook: "",
    whyFavoriteBook: "",
    facoriteMovie: "",
    whyFavoriteMovie: "",
    favoriteSeries: "",
    whyFavoritSeries: "",
    height: "",
    occupation: "",
    nativeTown: "",
    currentResidence: "",
    birthDate: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [hobbies, setHobbies] = React.useState(initialValues.hobbies);
  const [favoritePlaceToTravel, setFavoritePlaceToTravel] = React.useState(
    initialValues.favoritePlaceToTravel
  );
  const [whyFavoritePlaceToTravel, setWhyFavoritePlaceToTravel] =
    React.useState(initialValues.whyFavoritePlaceToTravel);
  const [favoriteFood, setFavoriteFood] = React.useState(
    initialValues.favoriteFood
  );
  const [whyFavoriteFood, setWhyFavoriteFood] = React.useState(
    initialValues.whyFavoriteFood
  );
  const [textingSkillRating, setTextingSkillRating] = React.useState(
    initialValues.textingSkillRating
  );
  const [mostPopularDatingPlatform, setMostPopularDatingPlatform] =
    React.useState(initialValues.mostPopularDatingPlatform);
  const [favoriteBook, setFavoriteBook] = React.useState(
    initialValues.favoriteBook
  );
  const [whyFavoriteBook, setWhyFavoriteBook] = React.useState(
    initialValues.whyFavoriteBook
  );
  const [facoriteMovie, setFacoriteMovie] = React.useState(
    initialValues.facoriteMovie
  );
  const [whyFavoriteMovie, setWhyFavoriteMovie] = React.useState(
    initialValues.whyFavoriteMovie
  );
  const [favoriteSeries, setFavoriteSeries] = React.useState(
    initialValues.favoriteSeries
  );
  const [whyFavoritSeries, setWhyFavoritSeries] = React.useState(
    initialValues.whyFavoritSeries
  );
  const [height, setHeight] = React.useState(initialValues.height);
  const [occupation, setOccupation] = React.useState(initialValues.occupation);
  const [nativeTown, setNativeTown] = React.useState(initialValues.nativeTown);
  const [currentResidence, setCurrentResidence] = React.useState(
    initialValues.currentResidence
  );
  const [birthDate, setBirthDate] = React.useState(initialValues.birthDate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setHobbies(cleanValues.hobbies);
    setFavoritePlaceToTravel(cleanValues.favoritePlaceToTravel);
    setWhyFavoritePlaceToTravel(cleanValues.whyFavoritePlaceToTravel);
    setFavoriteFood(cleanValues.favoriteFood);
    setWhyFavoriteFood(cleanValues.whyFavoriteFood);
    setTextingSkillRating(cleanValues.textingSkillRating);
    setMostPopularDatingPlatform(cleanValues.mostPopularDatingPlatform);
    setFavoriteBook(cleanValues.favoriteBook);
    setWhyFavoriteBook(cleanValues.whyFavoriteBook);
    setFacoriteMovie(cleanValues.facoriteMovie);
    setWhyFavoriteMovie(cleanValues.whyFavoriteMovie);
    setFavoriteSeries(cleanValues.favoriteSeries);
    setWhyFavoritSeries(cleanValues.whyFavoritSeries);
    setHeight(cleanValues.height);
    setOccupation(cleanValues.occupation);
    setNativeTown(cleanValues.nativeTown);
    setCurrentResidence(cleanValues.currentResidence);
    setBirthDate(cleanValues.birthDate);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    firstName: [],
    lastName: [],
    hobbies: [],
    favoritePlaceToTravel: [],
    whyFavoritePlaceToTravel: [],
    favoriteFood: [],
    whyFavoriteFood: [],
    textingSkillRating: [],
    mostPopularDatingPlatform: [],
    favoriteBook: [],
    whyFavoriteBook: [],
    facoriteMovie: [],
    whyFavoriteMovie: [],
    favoriteSeries: [],
    whyFavoritSeries: [],
    height: [],
    occupation: [],
    nativeTown: [],
    currentResidence: [],
    birthDate: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          hobbies: hobbies ?? null,
          favoritePlaceToTravel: favoritePlaceToTravel ?? null,
          whyFavoritePlaceToTravel: whyFavoritePlaceToTravel ?? null,
          favoriteFood: favoriteFood ?? null,
          whyFavoriteFood: whyFavoriteFood ?? null,
          textingSkillRating: textingSkillRating ?? null,
          mostPopularDatingPlatform: mostPopularDatingPlatform ?? null,
          favoriteBook: favoriteBook ?? null,
          whyFavoriteBook: whyFavoriteBook ?? null,
          facoriteMovie: facoriteMovie ?? null,
          whyFavoriteMovie: whyFavoriteMovie ?? null,
          favoriteSeries: favoriteSeries ?? null,
          whyFavoritSeries: whyFavoritSeries ?? null,
          height: height ?? null,
          occupation: occupation ?? null,
          nativeTown: nativeTown ?? null,
          currentResidence: currentResidence ?? null,
          birthDate: birthDate ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Hobbies"
        isRequired={false}
        isReadOnly={false}
        value={hobbies}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies: value,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.hobbies ?? value;
          }
          if (errors.hobbies?.hasError) {
            runValidationTasks("hobbies", value);
          }
          setHobbies(value);
        }}
        onBlur={() => runValidationTasks("hobbies", hobbies)}
        errorMessage={errors.hobbies?.errorMessage}
        hasError={errors.hobbies?.hasError}
        {...getOverrideProps(overrides, "hobbies")}
      ></TextField>
      <TextField
        label="Favorite place to travel"
        isRequired={false}
        isReadOnly={false}
        value={favoritePlaceToTravel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel: value,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.favoritePlaceToTravel ?? value;
          }
          if (errors.favoritePlaceToTravel?.hasError) {
            runValidationTasks("favoritePlaceToTravel", value);
          }
          setFavoritePlaceToTravel(value);
        }}
        onBlur={() =>
          runValidationTasks("favoritePlaceToTravel", favoritePlaceToTravel)
        }
        errorMessage={errors.favoritePlaceToTravel?.errorMessage}
        hasError={errors.favoritePlaceToTravel?.hasError}
        {...getOverrideProps(overrides, "favoritePlaceToTravel")}
      ></TextField>
      <TextField
        label="Why favorite place to travel"
        isRequired={false}
        isReadOnly={false}
        value={whyFavoritePlaceToTravel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel: value,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.whyFavoritePlaceToTravel ?? value;
          }
          if (errors.whyFavoritePlaceToTravel?.hasError) {
            runValidationTasks("whyFavoritePlaceToTravel", value);
          }
          setWhyFavoritePlaceToTravel(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "whyFavoritePlaceToTravel",
            whyFavoritePlaceToTravel
          )
        }
        errorMessage={errors.whyFavoritePlaceToTravel?.errorMessage}
        hasError={errors.whyFavoritePlaceToTravel?.hasError}
        {...getOverrideProps(overrides, "whyFavoritePlaceToTravel")}
      ></TextField>
      <TextField
        label="Favorite food"
        isRequired={false}
        isReadOnly={false}
        value={favoriteFood}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood: value,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.favoriteFood ?? value;
          }
          if (errors.favoriteFood?.hasError) {
            runValidationTasks("favoriteFood", value);
          }
          setFavoriteFood(value);
        }}
        onBlur={() => runValidationTasks("favoriteFood", favoriteFood)}
        errorMessage={errors.favoriteFood?.errorMessage}
        hasError={errors.favoriteFood?.hasError}
        {...getOverrideProps(overrides, "favoriteFood")}
      ></TextField>
      <TextField
        label="Why favorite food"
        isRequired={false}
        isReadOnly={false}
        value={whyFavoriteFood}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood: value,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.whyFavoriteFood ?? value;
          }
          if (errors.whyFavoriteFood?.hasError) {
            runValidationTasks("whyFavoriteFood", value);
          }
          setWhyFavoriteFood(value);
        }}
        onBlur={() => runValidationTasks("whyFavoriteFood", whyFavoriteFood)}
        errorMessage={errors.whyFavoriteFood?.errorMessage}
        hasError={errors.whyFavoriteFood?.hasError}
        {...getOverrideProps(overrides, "whyFavoriteFood")}
      ></TextField>
      <TextField
        label="Texting skill rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={textingSkillRating}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating: value,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.textingSkillRating ?? value;
          }
          if (errors.textingSkillRating?.hasError) {
            runValidationTasks("textingSkillRating", value);
          }
          setTextingSkillRating(value);
        }}
        onBlur={() =>
          runValidationTasks("textingSkillRating", textingSkillRating)
        }
        errorMessage={errors.textingSkillRating?.errorMessage}
        hasError={errors.textingSkillRating?.hasError}
        {...getOverrideProps(overrides, "textingSkillRating")}
      ></TextField>
      <TextField
        label="Most popular dating platform"
        isRequired={false}
        isReadOnly={false}
        value={mostPopularDatingPlatform}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform: value,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.mostPopularDatingPlatform ?? value;
          }
          if (errors.mostPopularDatingPlatform?.hasError) {
            runValidationTasks("mostPopularDatingPlatform", value);
          }
          setMostPopularDatingPlatform(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "mostPopularDatingPlatform",
            mostPopularDatingPlatform
          )
        }
        errorMessage={errors.mostPopularDatingPlatform?.errorMessage}
        hasError={errors.mostPopularDatingPlatform?.hasError}
        {...getOverrideProps(overrides, "mostPopularDatingPlatform")}
      ></TextField>
      <TextField
        label="Favorite book"
        isRequired={false}
        isReadOnly={false}
        value={favoriteBook}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook: value,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.favoriteBook ?? value;
          }
          if (errors.favoriteBook?.hasError) {
            runValidationTasks("favoriteBook", value);
          }
          setFavoriteBook(value);
        }}
        onBlur={() => runValidationTasks("favoriteBook", favoriteBook)}
        errorMessage={errors.favoriteBook?.errorMessage}
        hasError={errors.favoriteBook?.hasError}
        {...getOverrideProps(overrides, "favoriteBook")}
      ></TextField>
      <TextField
        label="Why favorite book"
        isRequired={false}
        isReadOnly={false}
        value={whyFavoriteBook}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook: value,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.whyFavoriteBook ?? value;
          }
          if (errors.whyFavoriteBook?.hasError) {
            runValidationTasks("whyFavoriteBook", value);
          }
          setWhyFavoriteBook(value);
        }}
        onBlur={() => runValidationTasks("whyFavoriteBook", whyFavoriteBook)}
        errorMessage={errors.whyFavoriteBook?.errorMessage}
        hasError={errors.whyFavoriteBook?.hasError}
        {...getOverrideProps(overrides, "whyFavoriteBook")}
      ></TextField>
      <TextField
        label="Facorite movie"
        isRequired={false}
        isReadOnly={false}
        value={facoriteMovie}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie: value,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.facoriteMovie ?? value;
          }
          if (errors.facoriteMovie?.hasError) {
            runValidationTasks("facoriteMovie", value);
          }
          setFacoriteMovie(value);
        }}
        onBlur={() => runValidationTasks("facoriteMovie", facoriteMovie)}
        errorMessage={errors.facoriteMovie?.errorMessage}
        hasError={errors.facoriteMovie?.hasError}
        {...getOverrideProps(overrides, "facoriteMovie")}
      ></TextField>
      <TextField
        label="Why favorite movie"
        isRequired={false}
        isReadOnly={false}
        value={whyFavoriteMovie}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie: value,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.whyFavoriteMovie ?? value;
          }
          if (errors.whyFavoriteMovie?.hasError) {
            runValidationTasks("whyFavoriteMovie", value);
          }
          setWhyFavoriteMovie(value);
        }}
        onBlur={() => runValidationTasks("whyFavoriteMovie", whyFavoriteMovie)}
        errorMessage={errors.whyFavoriteMovie?.errorMessage}
        hasError={errors.whyFavoriteMovie?.hasError}
        {...getOverrideProps(overrides, "whyFavoriteMovie")}
      ></TextField>
      <TextField
        label="Favorite series"
        isRequired={false}
        isReadOnly={false}
        value={favoriteSeries}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries: value,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.favoriteSeries ?? value;
          }
          if (errors.favoriteSeries?.hasError) {
            runValidationTasks("favoriteSeries", value);
          }
          setFavoriteSeries(value);
        }}
        onBlur={() => runValidationTasks("favoriteSeries", favoriteSeries)}
        errorMessage={errors.favoriteSeries?.errorMessage}
        hasError={errors.favoriteSeries?.hasError}
        {...getOverrideProps(overrides, "favoriteSeries")}
      ></TextField>
      <TextField
        label="Why favorit series"
        isRequired={false}
        isReadOnly={false}
        value={whyFavoritSeries}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries: value,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.whyFavoritSeries ?? value;
          }
          if (errors.whyFavoritSeries?.hasError) {
            runValidationTasks("whyFavoritSeries", value);
          }
          setWhyFavoritSeries(value);
        }}
        onBlur={() => runValidationTasks("whyFavoritSeries", whyFavoritSeries)}
        errorMessage={errors.whyFavoritSeries?.errorMessage}
        hasError={errors.whyFavoritSeries?.hasError}
        {...getOverrideProps(overrides, "whyFavoritSeries")}
      ></TextField>
      <TextField
        label="Height"
        isRequired={false}
        isReadOnly={false}
        value={height}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height: value,
              occupation,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.height ?? value;
          }
          if (errors.height?.hasError) {
            runValidationTasks("height", value);
          }
          setHeight(value);
        }}
        onBlur={() => runValidationTasks("height", height)}
        errorMessage={errors.height?.errorMessage}
        hasError={errors.height?.hasError}
        {...getOverrideProps(overrides, "height")}
      ></TextField>
      <TextField
        label="Occupation"
        isRequired={false}
        isReadOnly={false}
        value={occupation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation: value,
              nativeTown,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.occupation ?? value;
          }
          if (errors.occupation?.hasError) {
            runValidationTasks("occupation", value);
          }
          setOccupation(value);
        }}
        onBlur={() => runValidationTasks("occupation", occupation)}
        errorMessage={errors.occupation?.errorMessage}
        hasError={errors.occupation?.hasError}
        {...getOverrideProps(overrides, "occupation")}
      ></TextField>
      <TextField
        label="Native town"
        isRequired={false}
        isReadOnly={false}
        value={nativeTown}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown: value,
              currentResidence,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.nativeTown ?? value;
          }
          if (errors.nativeTown?.hasError) {
            runValidationTasks("nativeTown", value);
          }
          setNativeTown(value);
        }}
        onBlur={() => runValidationTasks("nativeTown", nativeTown)}
        errorMessage={errors.nativeTown?.errorMessage}
        hasError={errors.nativeTown?.hasError}
        {...getOverrideProps(overrides, "nativeTown")}
      ></TextField>
      <TextField
        label="Current residence"
        isRequired={false}
        isReadOnly={false}
        value={currentResidence}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence: value,
              birthDate,
            };
            const result = onChange(modelFields);
            value = result?.currentResidence ?? value;
          }
          if (errors.currentResidence?.hasError) {
            runValidationTasks("currentResidence", value);
          }
          setCurrentResidence(value);
        }}
        onBlur={() => runValidationTasks("currentResidence", currentResidence)}
        errorMessage={errors.currentResidence?.errorMessage}
        hasError={errors.currentResidence?.hasError}
        {...getOverrideProps(overrides, "currentResidence")}
      ></TextField>
      <TextField
        label="Birth date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={birthDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              hobbies,
              favoritePlaceToTravel,
              whyFavoritePlaceToTravel,
              favoriteFood,
              whyFavoriteFood,
              textingSkillRating,
              mostPopularDatingPlatform,
              favoriteBook,
              whyFavoriteBook,
              facoriteMovie,
              whyFavoriteMovie,
              favoriteSeries,
              whyFavoritSeries,
              height,
              occupation,
              nativeTown,
              currentResidence,
              birthDate: value,
            };
            const result = onChange(modelFields);
            value = result?.birthDate ?? value;
          }
          if (errors.birthDate?.hasError) {
            runValidationTasks("birthDate", value);
          }
          setBirthDate(value);
        }}
        onBlur={() => runValidationTasks("birthDate", birthDate)}
        errorMessage={errors.birthDate?.errorMessage}
        hasError={errors.birthDate?.hasError}
        {...getOverrideProps(overrides, "birthDate")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
