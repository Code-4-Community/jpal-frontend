import { Question } from '../../api/dtos/survey-assignment.dto';

export const NEVER = 'Never' as const;
export const RARELY = 'Rarely' as const;
export const SOMEWHAT = 'Somewhat' as const;
export const OFTEN = 'Often' as const;
export const ALWAYS = 'Always' as const;

export const FIVE_SENTIMENT_OPTIONS = [NEVER, RARELY, SOMEWHAT, OFTEN, ALWAYS];

const DEFAULT_QUESTIONS: Question[] = [
  {
    question: 'How often is this student responsible?',
    options: FIVE_SENTIMENT_OPTIONS,
  },
  {
    question: 'How often does this student demonstrate leadership?',
    options: FIVE_SENTIMENT_OPTIONS,
  },
  {
    question: 'How often does this student demonstrate initiative?',
    options: FIVE_SENTIMENT_OPTIONS,
  },
];

export default DEFAULT_QUESTIONS;
