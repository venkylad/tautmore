import { v4 as uuid } from 'uuid';

export const ansData = [
    {
        id: uuid(),
        value: 4,
        selected: false,
    },
    {
        id: uuid(),
        value: 7,
        selected: true,
    },
    {
        id: uuid(),
        value: 9,
        selected: false,
    },
    {
        id: uuid(),
        value: 6,
        selected: false,
    },
];

export const quesData = {
    title: 'How many planes can you spot flying here?',
    objects: [1, 2, 3, 4, 5, 6, 7],
};
export const quesData1 = {
    title: 'Select the days of the week (select more than 1 option)',
    objects: [],
    questionType: 'selectTile',
    answer: [
        {
            id: uuid(),
            value: 'Sunday',
        },
        {
            id: uuid(),
            value: 'Friday',
        },
        {
            id: uuid(),
            value: 'January',
        },
        {
            id: uuid(),
            value: 'April',
        },
    ],
};
