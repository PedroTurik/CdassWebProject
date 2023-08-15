import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { error, type Actions } from '@sveltejs/kit';
import { db } from '$lib/firebase';
import { adminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const load = (async ({ params }) => {

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
    throw error(404, "that problem does not exist!");
  }



  return {
    title: data.title,
    points: data.points,
    text: data.text
  };

}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {

    const data = await request.formData();
    const username = data.get('username') as string;
    const uid = data.get('uid') as string;
    const problemId = data.get('problemId') as string;
    const answer = data.get('answer') as string;

    const docRef = await adminDB.collection("user_problem").doc(username + "-" + problemId).get()
    console.log(docRef)
    const exists = docRef.exists;

    if (exists) {
      return {status: "answered"};
    }

    const snap = await adminDB.collection("problems").where("id", "==", +problemId).limit(1).get();


    const problemData = snap.docs[0]?.data() as ProblemData;
    if (problemData.answer == answer) {
      console.log("SUCCESS")
      confirmAnswer(problemData, username, problemId, uid);
      return {status: "success"};

    } else {
      console.log("ERROOU")
      return {status: "wrong"};
    }
  }
};

async function confirmAnswer(problemData: ProblemData, username: string, problemId: string, uid: string ) {
  const userProblemData: UserProblemData = {
    code: "ITS NOT WORKING CURRENTLY TODO",
    problem_id: +problemId,
    rating: 0,
    uid: uid,
  };
  console.log(userProblemData)

  const userName = username;

  await adminDB.collection("user_problem").doc(userName + "-" + problemId).set(userProblemData)

  await adminDB.collection("users").doc(uid).update({ points: FieldValue.increment(problemData.points)})


}
