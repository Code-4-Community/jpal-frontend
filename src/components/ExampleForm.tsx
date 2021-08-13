/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';

const ExampleForm: React.FC = () => (
  <Formik
    initialValues={{ favoriteColor: 'Purple' }}
    onSubmit={(values, actions) => {
      // import and call method on api
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {(props) => (
      <Form>
        {/* We're using simple validation here, in the future we may need to use a Yup schema but lets keep it simple for now */}
        <Field
          name="favoriteColor"
          validate={(value: string) => {
            let error: string | undefined;

            if (!value) {
              error = 'Favorite color is required.';
            }
            if (value.toLowerCase() === 'brown') {
              error = 'Thats a bad opinion. Choose something else.';
            }
            return error;
          }}
        >
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
