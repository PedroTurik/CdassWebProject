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
    text: data.text,
    input: data.input,
    begginer: data.begginer
  };

}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request }) => {

    const data = await request.formData();
    const uid = locals.userID as string;
    const username = data.get('username') as string;
    const problemId = data.get('problemId') as string;
    const answer = data.get('answer') as string;

    const docRef = await adminDB.collection("user_problem").doc(username + "-" + problemId).get()
    const exists = docRef.exists;

    if (exists) {
      return { status: "answered" };
    }

    const snap = await adminDB.collection("problems").where("id", "==", +problemId).limit(1).get();


    const problemData = snap.docs[0]?.data() as ProblemData;
    if (problemData.answer == answer) {
      try {
        
        await confirmAnswer(problemData, username, problemId, uid);
      } catch (_) {
        throw error(444, "Resposta certa mas um erro ocorreu, tente se deslogar e fechar o site antes de tentar novamente")
      }

      return { status: "success" };

    } else {
      return { status: "wrong" };
    }
  }
};

async function confirmAnswer(problemData: ProblemData, username: string, problemId: string, uid: string) {
  const userProblemData: UserProblemData = {
    code: "ITS NOT WORKING CURRENTLY TODO",
    problem_id: +problemId,
    rating: 0,
    uid: uid,
  };

  const batch = adminDB.batch();
  const answerRef = adminDB.collection("user_problem").doc(username + "-" + problemId)
  const userRef = adminDB.collection("users").doc(uid)
  const problemRef = adminDB.collection("problems").doc(problemId)
  batch.set(answerRef, userProblemData)
  const userUpdate =
    problemData.begginer ?
      { points: FieldValue.increment(problemData.points) } :
      { chad_points: FieldValue.increment(problemData.points) }

  batch.update(userRef, userUpdate)

  if (problemData.points > 30) {
    batch.update(problemRef, { points: FieldValue.increment(-5) })
  }
  batch.commit()

}
