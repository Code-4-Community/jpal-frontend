import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import React, { PropsWithoutRef, ReactNode } from 'react';

interface FormProps<GenericFormValues>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children?: ReactNode;
  submitText?: string;
  onSubmit: (values: Partial<GenericFormValues>) => Promise<void>;
  initialValues?: FormikProps<Partial<GenericFormValues>>['initialValues'];
}

/**
 * A generic form component that contains the logic for handing form state and submission.
 * To be used in conjunction with other Field components.
 */
type FormComponent<GenericFormValues> = React.FC<FormProps<GenericFormValues>>;

/**
 * creates a React element to render a form whose values are represented by the generic type.
 */
function createForm<X>(): FormComponent<X> {
  const CustomForm: FormComponent<X> = ({ children, initialValues, onSubmit, submitText }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Formik
      initialValues={initialValues || {}}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {(props) => (
        <Form>
          {children}
          {props.isSubmitting}
          <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
            {submitText ?? 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
  return CustomForm;
}

export default createForm;
