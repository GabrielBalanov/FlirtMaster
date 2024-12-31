import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { User } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
    firstName?: string;
    lastName?: string;
    hobbies?: string;
    favoritePlaceToTravel?: string;
    whyFavoritePlaceToTravel?: string;
    favoriteFood?: string;
    whyFavoriteFood?: string;
    textingSkillRating?: number;
    mostPopularDatingPlatform?: string;
    favoriteBook?: string;
    whyFavoriteBook?: string;
    facoriteMovie?: string;
    whyFavoriteMovie?: string;
    favoriteSeries?: string;
    whyFavoritSeries?: string;
    height?: string;
    occupation?: string;
    nativeTown?: string;
    currentResidence?: string;
    birthDate?: string;
};
export declare type UserUpdateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    hobbies?: ValidationFunction<string>;
    favoritePlaceToTravel?: ValidationFunction<string>;
    whyFavoritePlaceToTravel?: ValidationFunction<string>;
    favoriteFood?: ValidationFunction<string>;
    whyFavoriteFood?: ValidationFunction<string>;
    textingSkillRating?: ValidationFunction<number>;
    mostPopularDatingPlatform?: ValidationFunction<string>;
    favoriteBook?: ValidationFunction<string>;
    whyFavoriteBook?: ValidationFunction<string>;
    facoriteMovie?: ValidationFunction<string>;
    whyFavoriteMovie?: ValidationFunction<string>;
    favoriteSeries?: ValidationFunction<string>;
    whyFavoritSeries?: ValidationFunction<string>;
    height?: ValidationFunction<string>;
    occupation?: ValidationFunction<string>;
    nativeTown?: ValidationFunction<string>;
    currentResidence?: ValidationFunction<string>;
    birthDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    hobbies?: PrimitiveOverrideProps<TextFieldProps>;
    favoritePlaceToTravel?: PrimitiveOverrideProps<TextFieldProps>;
    whyFavoritePlaceToTravel?: PrimitiveOverrideProps<TextFieldProps>;
    favoriteFood?: PrimitiveOverrideProps<TextFieldProps>;
    whyFavoriteFood?: PrimitiveOverrideProps<TextFieldProps>;
    textingSkillRating?: PrimitiveOverrideProps<TextFieldProps>;
    mostPopularDatingPlatform?: PrimitiveOverrideProps<TextFieldProps>;
    favoriteBook?: PrimitiveOverrideProps<TextFieldProps>;
    whyFavoriteBook?: PrimitiveOverrideProps<TextFieldProps>;
    facoriteMovie?: PrimitiveOverrideProps<TextFieldProps>;
    whyFavoriteMovie?: PrimitiveOverrideProps<TextFieldProps>;
    favoriteSeries?: PrimitiveOverrideProps<TextFieldProps>;
    whyFavoritSeries?: PrimitiveOverrideProps<TextFieldProps>;
    height?: PrimitiveOverrideProps<TextFieldProps>;
    occupation?: PrimitiveOverrideProps<TextFieldProps>;
    nativeTown?: PrimitiveOverrideProps<TextFieldProps>;
    currentResidence?: PrimitiveOverrideProps<TextFieldProps>;
    birthDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
