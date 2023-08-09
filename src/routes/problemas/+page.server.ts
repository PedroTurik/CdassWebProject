import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';
import { error, type Actions } from '@sveltejs/kit';


export const load = (async () => {

    const querySnapshot = await getDocs(collection(db, "problems"));

    const problems: ProblemData[] = [];
    const begginerProblems: ProblemData[] = [];
    
    querySnapshot.forEach((doc) => {
        const p = doc.data() as ProblemData
        
        if (p.begginer) {
            begginerProblems.push(p);
        } else {
            problems.push(p);
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
        console.log(begginerCheck)

        if (!title || !text || !answer) {
            throw error(500, "erros in formData")
        }

        const collectionRef = collection(db, "problems");

        const queryRef = query(
            collectionRef,
            orderBy("id", "desc"),
            limit(1)
        );

        const snapshot = await getDocs(queryRef);
        const data = snapshot.docs[0]?.data() as ProblemData;
        
        const id = (data?.id ?? 0) + 1
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

        const problemsRef = collection(db, "problems");
        const docRef = await addDoc(problemsRef, problemData)

        if (!docRef.id) {
            throw error(500, "failed to add problem to firestore")
        }


    }
} satisfies Actions