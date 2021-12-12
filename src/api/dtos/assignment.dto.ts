// bad name
export interface SurveyData {
  uuid: string;
  controlYouth: Youth[];
  treatmentYouth: Youth[];
}

export interface Youth {
  email: string;
  firstName: string;
  lastName: string;
}
