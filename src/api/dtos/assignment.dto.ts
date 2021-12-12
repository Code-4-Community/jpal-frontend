// bad name
export interface SurveyAssignment {
  uuid: string;
  controlYouth: Youth[];
  treatmentYouth: Youth[];
}

export interface Youth {
  email: string;
  firstName: string;
  lastName: string;
}
