import React, { FC, useEffect, useState } from 'react';

import styles from './CorrelateInput.module.scss';

type CorrelateItem = { question: { id: number; questionText: string }; answer: { id: number; answerText: string } };

type CorrelateInputProps = {
    className?: string;
    questions: { id: number; questionText: string }[];
    answers: { id: number; answerText: string }[];
    onChange?: (values: CorrelateItem[]) => void;
};

const CorrelateInput: FC<CorrelateInputProps> = ({ answers, questions, onChange }) => {
    const [state, setState] = useState(
        questions.map((question, index) => ({ question, answer: answers[index], finished: false }))
    );
    const [selectedQuestion, setSelectedQuestion] = useState<CorrelateItem | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<CorrelateItem | null>(null);

    const onQuestionSelect = (item: CorrelateItem) => () => setSelectedQuestion(item);
    const onAnswerSelect = (item: CorrelateItem) => () => setSelectedAnswer(item);

    useEffect(() => {
        if (selectedQuestion && selectedAnswer) {
            setState((prev) =>
                prev.map((item) => {
                    if (item === selectedQuestion) {
                        return { question: item.question, answer: selectedAnswer.answer, finished: true };
                    } else if (item === selectedAnswer) {
                        return { question: item.question, answer: selectedQuestion.answer, finished: false };
                    }
                    return item;
                })
            );
            if (onChange) onChange(state.map(({ question, answer }) => ({ question, answer })));
            setSelectedQuestion(null);
            setSelectedAnswer(null);
        }
    }, [selectedQuestion, selectedAnswer]);

    return (
        <div className={styles.fullWidth}>
            {state.map((item) => (
                <div key={item.question.id} className={`${styles.row} ${item.finished ? styles.finished : ''}`}>
                    <p
                        className={item.question.id === selectedQuestion?.question.id ? styles.active : undefined}
                        onClick={onQuestionSelect(item)}>
                        {item.question.questionText}
                    </p>
                    <p
                        className={item.answer.id === selectedAnswer?.answer.id ? styles.active : undefined}
                        onClick={onAnswerSelect(item)}>
                        {item.answer.answerText}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default CorrelateInput;
