import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase';

export const load = (async () => {

    const collectionRef = collection(db, "users");

    const queryRefAdvanced = query(
        collectionRef,
        orderBy("chad_points", "desc"),
        limit(10)
    );
    const queryRefNewbie = query(
        collectionRef,
        where("newbie", "==", true),
        orderBy("points", "desc"),
        limit(10)
    );

    const snapAdvanced = await getDocs(queryRefAdvanced);
    const snapNewbie = await getDocs(queryRefNewbie);

    const advancedRank = [] as UserData[];
    const begginerRank = [] as UserData[];

    snapAdvanced.docs?.forEach((doc) => {
        advancedRank.push(doc.data() as UserData);
    })

    snapNewbie.docs?.forEach((doc) => {
        begginerRank.push(doc.data() as UserData);
    })


    return {
        advancedRank: advancedRank,
        begginerRank: begginerRank
    };
}) satisfies PageLoad;