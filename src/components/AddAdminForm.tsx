/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import apiClient from '../api/apiClient';

interface AdminValues {
  email: string, 
}


const submitUser = (values: AdminValues, actions: FormikHelpers<AdminValues> ) => {
  const data = {...values, role: "admin"}
  const token = localStorage.getItem("token");
  console.log("token ", token);
  apiClient.post("/user", data).then((res) => {
    alert(res);
  }).catch((err) => {
    console.log(data);
  })
  
  actions.setSubmitting(false);
}


export const AddAdminForm: React.FC<AdminValues> = ({email} : AdminValues) => (
  <Formik initialValues={{email}} onSubmit={submitUser}>
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
