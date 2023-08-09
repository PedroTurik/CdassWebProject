import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/firebase';

export const load = (async ( { params } ) => {
    
    const collectionRef = collection(db, "problems");

    const q = query(
      collectionRef,
      where("id", "==", +params.problemId),
      limit(1)
    );
    const snapshot = await getDocs(q);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data() as ProblemData;
  
    if (!exists) {
      throw error(404, "that user does not exist!");
    }
  

  
    return {
      title: data.title,
      points: data.points,
      text: data.text
    };

}) satisfies PageLoad;