interface UserData {
    username: string;
    photoURL: string;
    points: number;
    chad_points: number;
    admin: boolean;
    newbie: boolean;
}


interface ProblemData {
    title: string;
    text: string;
    points: number;
    id: number;
    answer: string;
    input: string;
    begginer: boolean;
    semester: number;
}

type TableProblemData = Pick<ProblemData, "id" | "title" | "points">;


interface UserProblemData {
    code: string;
    problem_id: number;
    rating: number;
    uid: string
}