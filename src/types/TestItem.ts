import { TestItemType } from './AdminTestItem';

export type TestItem = {
    answerDTOs?: { id: number; text: string }[];
    ratioAnswers?: { answerText: string; id: number }[];
    ratioQuestions?: { id: number; questionText: string }[];
    id: number;
    questionText: string;
    itemType: TestItemType;
};
