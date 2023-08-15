interface UserData {
    username: string;
    photoURL: string;
    points: number;
    admin: boolean;
    newbie: boolean;
}

type RankUserData = Pick<UserData, "username" | "points">

interface ProblemData {
    title: string;
    text: string;
    points: number;
    id: number;
    answer: string;
    input: string;
    begginer: boolean;
}

type TableProblemData = Pick<ProblemData, "id" | "title" | "points">;


interface UserProblemData {
    code: string;
    problem_id: number;
    rating: number;
    uid: string
}