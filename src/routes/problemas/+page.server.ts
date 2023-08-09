import { collection, getDocs, type DocumentData } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';


interface ProblemData {
    title: string;
    text: string;
    points: number;
    id: number;
    answer: string;
  }


export const load = (async () => {

    const querySnapshot = await getDocs(collection(db, "cities"));

    const problems: ProblemData[] = [];

    querySnapshot.forEach((doc) => {
        problems.push(doc.data() as ProblemData)
    });


    return {
        problems: problems
    };
}) satisfies PageServerLoad;