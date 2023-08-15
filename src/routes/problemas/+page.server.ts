import { collection, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';
import { error, type Actions } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';

type TableProblemData = Pick<ProblemData, "id" | "title" | "points">;


export const load = (async () => {

    const querySnapshot = await getDocs(collection(db, "problems"));

    const problems: TableProblemData[] = [];
    const begginerProblems: TableProblemData[] = [];

    querySnapshot.forEach((doc) => {
        const p = doc.data() as ProblemData
        if (p.begginer) {
            begginerProblems.push({ points: p.points, title: p.title, id: p.id });
        } else {
            problems.push({ points: p.points, title: p.title, id: p.id });
        }
    });

    problems.sort((a, b) => a.id - b.id)
    begginerProblems.sort((a, b) => a.id - b.id)

    return {
        problems: problems,
        begginerProblems: begginerProblems
    };
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const text = formData.get("text") as string;
        const answer = formData.get("answer") as string;
        const input = formData.get("input") as string;
        const begginerCheck = formData.get("begginer-check") as string;

        if (!title || !text || !answer) {
            throw error(500, "erros in formData")
        }

        // const collectionRef = collection(db, "problems");

        // const queryRef = query(
        //     collectionRef,
        //     orderBy("id", "desc"),
        //     limit(1)
        // );

        // const snapshot = await getDocs(queryRef);
        // const data = snapshot.docs[0]?.data() as ProblemData;

        const id = (await adminDB.collection("problems").count().get()).data().count;
        const begginer = begginerCheck == 'on'

        const problemData: ProblemData = {
            title: title,
            text: text,
            answer: answer,
            points: 100,
            id: id,
            input: input,
            begginer: begginer,
        }

        const docAdded = await adminDB.collection("problems").doc("" + id).set(problemData)

        if (!docAdded.writeTime) {
            throw error(500, "failed to add problem to firestore")
        }


    }
} satisfies Actions