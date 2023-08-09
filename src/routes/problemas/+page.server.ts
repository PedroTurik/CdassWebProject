import { collection, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';


export const load = (async () => {

    const querySnapshot = await getDocs(collection(db, "problems"));

    const problems: ProblemData[] = [];

    querySnapshot.forEach((doc) => {
        problems.push(doc.data() as ProblemData)
    });


    return {
        problems: problems
    };
}) satisfies PageServerLoad;