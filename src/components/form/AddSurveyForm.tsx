import React from "react";
import {FormikHelpers} from "formik";
import SurveyForm from "../survey/SurveyForm";
import DEFAULT_QUESTIONS from "../survey/defaultQuestions";

export interface AddSurveyValues {
    firstName: string;
    lastName: string;
    email: string;
}

export interface AddSurveyProps {
    onSubmit: (
        values: AddSurveyValues,
        actions: FormikHelpers<Partial<AddSurveyValues>>,
    ) => Promise<void>;
}


export const AddSurveyForm:React.FC = () => (
    <SurveyForm
        youthName="Youth name goes here"
        questions={DEFAULT_QUESTIONS}
        mock
    />
);
