/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import createForm from './form/Form';
import InputField from './form/InputField';

interface ExampleFormValues {
  favoriteColor: string;
}

interface ExampleFormProps {
  onSubmit?: (values: Partial<ExampleFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: Partial<ExampleFormValues>) => {
  // import and call method on api
  setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
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

const ExampleForm: React.FC<ExampleFormProps> = ({ onSubmit }) => {
  const Form = createForm<ExampleFormValues>();
  return (
    // eslint-disable-next-line no-alert
    <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{ favoriteColor: 'Purple' }}>
      <InputField
        displayName="Favorite Color"
        fieldName="favoriteColor"
        validate={validateFavoriteColor}
      />
    </Form>
  );
};

export default ExampleForm;
