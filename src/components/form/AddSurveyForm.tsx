import React from "react";
import {FormikHelpers} from "formik";
import {Box, Button, Divider, Input, VStack} from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons';
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
    <VStack spacing="6">
        <Box
        backgroundColor="#417671"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        padding="8"
        width="full"
        >
            <Input fontSize="3xl" color="white" placeholder="Survey Name"/>
            <Divider marginY="2"/>
            <Button colorScheme="gray">
                <DownloadIcon marginRight="10px"/>
                Upload Data
            </Button>
        </Box>
        <SurveyForm
        youthName="<Youth name>"
        questions={DEFAULT_QUESTIONS}
        mock/>
    </VStack>
);
