/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';

export interface AdminFormValues {
  email: string;
}

export interface AddAdminFormProps {
  onSubmit: (
    values: AdminFormValues,
    actions: FormikHelpers<Partial<AdminFormValues>>,
  ) => Promise<void>;
}

export const AddAdminForm: React.FC<AddAdminFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{}}
    onSubmit={(
      values: Partial<AdminFormValues>,
      actions: FormikHelpers<Partial<AdminFormValues>>,
    ) => onSubmit(values as AdminFormValues, actions)}
  >
    {(props) => (
      <Form>
        <Field name="email">
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.email && form.touched)}>
              <FormLabel htmlFor="email">New Admin Email</FormLabel>
              <Input {...field} id="admin-email" placeholder="email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button
          mt={4}
          colorScheme="teal"
          id="submit-admin-email"
          isLoading={props.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default AddAdminForm;
