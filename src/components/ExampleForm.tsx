/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';

interface ExampleFormValues {
  favoriteColor: string;
}
interface ExampleFormProps {
  onSubmit?: (values: ExampleFormValues) => void;
}

const alertOnSubmit = (values: ExampleFormValues, actions: FormikHelpers<ExampleFormValues>) => {
  // import and call method on api
  setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const validateFavoriteColor = (value: string) => {
  let error: string | undefined;

  if (!value) {
    error = 'Favorite color is required.';
  }
  if (value.toLowerCase() === 'brown') {
    error = 'Thats a bad opinion. Choose something else.';
  }
  return error;
};

const ExampleForm: React.FC<ExampleFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{ favoriteColor: 'Purple' }} onSubmit={onSubmit ?? alertOnSubmit}>
    {(props) => (
      <Form>
        <Field name="favoriteColor" validate={validateFavoriteColor}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.favoriteColor && form.touched)}>
              <FormLabel htmlFor="favoriteColor">Favorite Color</FormLabel>
              <Input {...field} id="favoriteColor" placeholder="Favorite Color" />
              <FormErrorMessage>{form.errors.favoriteColor}</FormErrorMessage>
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

export default ExampleForm;
