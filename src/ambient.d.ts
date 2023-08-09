interface UserData {
    username: string;
    photoURL: string;
    points: number;
    admin: boolean;
    newbie: boolean;
}

interface ProblemData {
    title: string;
    text: string;
    points: number;
    id: number;
    answer: string;
}