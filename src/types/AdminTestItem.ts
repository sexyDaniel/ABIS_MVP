export type AdminTestItem = {
    id: number;
    questionText: string;
    itemType: TestItemType;
    answers?: { id: number; text: string; isRight: boolean }[];
    getRatioQuestions?: {
        questionId: number;
        questionText: string;
        answerId: number;
        answerText: string;
    }[];
};
export type TestItemType = 'OneAnswer' | 'MultipleAnswers' | 'Correlate' | 'OpenAnswer';
