/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';
import { CreatePostRequest } from '../models/Post';

export interface CreatePostFormProps {
  onSubmit: (values: CreatePostRequest) => void;
}

const validateUserId = (value: string) => {
  let error: string | undefined;

  if (!value) {
    error = 'User ID is required.';
  }
  return error;
};

const validateTitle = (value: string) => {
  let error: string | undefined;

  if (!value) {
    error = 'Title is required.';
  }
  return error;
};

const validateBody = (value: string) => {
  let error: string | undefined;

  if (!value) {
    error = 'Body is required.';
  }
  return error;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{}}
    onSubmit={(values: Partial<CreatePostRequest>) => onSubmit(values as CreatePostRequest)}
  >
    {(props) => (
      <Form>
        <Field name="userId" validate={validateUserId}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.userId && form.touched)}>
              <FormLabel htmlFor="userId">User ID</FormLabel>
              <NumberInput
                {...field}
                onChange={(val) => form.setFieldValue(field.name, Number(val))}
              >
                <NumberInputField id="userId" placeholder="Enter user ID" />
              </NumberInput>
              <FormErrorMessage>{form.errors.userId}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="title" validate={validateTitle}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.title && form.touched)}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input {...field} id="title" placeholder="Enter post title" />
              <FormErrorMessage>{form.errors.title}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="body" validate={validateBody}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.body && form.touched)}>
              <FormLabel htmlFor="body">Body</FormLabel>
              <Input {...field} id="body" placeholder="Enter post body" />
              <FormErrorMessage>{form.errors.body}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default CreatePostForm;
