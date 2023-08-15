import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase';

export const load = (async () => {

    const collectionRef = collection(db, "users");

    const queryRefIntermediate = query(
        collectionRef,
        where("newbie", "==", false),
        orderBy("points", "desc"),
        limit(10)
    );
    const queryRefNewbie = query(
        collectionRef,
        where("newbie", "==", true),
        orderBy("points", "desc"),
        limit(10)
    );

    const snapIntermediate = await getDocs(queryRefIntermediate);
    const snapNewbie = await getDocs(queryRefNewbie);

    const interRank = [] as RankUserData[];
    const begginerRank = [] as RankUserData[];

    snapIntermediate.docs?.forEach((doc) => {
        interRank.push(doc.data() as UserData);
    })

    snapNewbie.docs?.forEach((doc) => {
        const data = doc.data() as UserData;
        begginerRank.push({username: data.username, points: data.points});
    })


    return {
        interRank: interRank,
        begginerRank: begginerRank
    };
}) satisfies PageLoad;