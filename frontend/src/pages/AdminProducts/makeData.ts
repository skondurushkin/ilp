export interface Person {
    firstName: string;
    lastName: string;
    firstName2: string;
    lastName2: string;
    firstName3: string;
    lastName3: string;
    firstName4: string;
    lastName4: string;
}
const newPerson = (index: number) => {
    return {
        firstName: '1' + index,
        lastName: '11' + index,
        firstName2: '2' + index,
        lastName2: '22' + index,
        firstName3: '3' + index,
        lastName3: '33' + index,
        firstName4: '4' + index,
        lastName4: '44' + index,
    };
};

export default function makeData(l: number): Person[] {
    return new Array(l).fill('').map((_, index) => newPerson(index));
}
