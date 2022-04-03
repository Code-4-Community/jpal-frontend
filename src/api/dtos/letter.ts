export type Letter = {
  shouldBeSent: boolean;
  date: Date;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: {
    fullName: string;
    organization: string;
  };
};
