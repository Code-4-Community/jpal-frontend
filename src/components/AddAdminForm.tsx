/* eslint-disable react/jsx-props-no-spreading */
import { sceneActions } from '@aws-amplify/ui';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';

interface AdminValues {
  email: string;
}
interface ExampleFormProps {
  onSubmit?: (values: AdminValues) => void;
}

const alertOnSubmit = (values: AdminValues, actions: FormikHelpers<AdminValues>) => {
  // import and call method on api
  setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const onSubmit1 = (values : AdminValues, actions: FormikHelpers<AdminValues> ) => {
  alert(JSON.stringify(values) );
  alert("yoooo");

  actions.setSubmitting(false);
}




export const AddAdminForm: React.FC<ExampleFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{ email: '' }} onSubmit={onSubmit ?? onSubmit1}>
    {(props) => (
      <Form>
        <Field name="email" >
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.email && form.touched)}>
              <FormLabel htmlFor="email">New Admin Email</FormLabel>
              <Input {...field} id="email" placeholder="email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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

export default AddAdminForm;
