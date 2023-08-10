<script lang="ts">
    import { page } from "$app/stores";
    import {
        collection,
        doc,
        getDoc,
        getDocs,
        increment,
        limit,
        query,
        setDoc,
        updateDoc,
        where,
    } from "firebase/firestore";
    import type { PageData } from "./$types";
    import { db, user, userData } from "$lib/firebase";
    import { error } from "@sveltejs/kit";

    export let data: PageData;
    let problemId: number = +$page.url.pathname.split("/")[2];
    let answer = "";

    let error_visible = false;
    let answered_visible = false;
    let success_visible = false;

    async function confirmAnswer(problemData: ProblemData) {
        if (!$user) {
            throw error(420, "heyheyhye");
        }
        const userProblemData: UserProblemData = {
            code: "ITS NOT WORKING CURRENTLY TODO",
            problem_id: problemId,
            rating: 0,
            uid: $user.uid,
        };
        const userName = $userData?.username;
        const ref = doc(db, "user_problem", userName + "-" + problemId);
        await setDoc(ref, userProblemData);

        const userRef = doc(db, "users", $user.uid);
        updateDoc(userRef, {
            points: increment(problemData.points),
        });
    }

    async function checkAnswer() {
        console.log("aAAAAAA");
        const userName = $userData?.username;
        const ref = doc(db, "user_problem", userName + "-" + problemId);
        const exists = await getDoc(ref).then((doc) => doc.exists());
        if (exists) {
            answered_visible = true;
            setTimeout(() => {
                answered_visible = false;
            }, 3000);
            return;
        }

        const q = query(
            collection(db, "problem"),
            where("id", "==", problemId),
            limit(1)
        );

        const snapshot = await getDocs(q);
        const problemData = snapshot.docs[0]?.data() as ProblemData;
        if (problemData.answer == answer) {
            success_visible = true;
            confirmAnswer(problemData);
        } else {
            error_visible = true;
            setTimeout(() => {
                error_visible = false;
            }, 3000);
        }
    }
</script>

<div class="text-7xl text-accent text-center py-10">
    {data.title}
</div>

<div class="mx-32 whitespace-pre-wrap">
    {data.text}
</div>

<form
    class="space-y-5 text-center my-20"
>
    <input
        bind:value={answer}
        on:input={() => console.log(answer)}
        type="text"
        placeholder="Answer"
        class="input input-bordered input-success"
    />

    <button class="btn btn-success">
        enviar resposta
    </button>
</form>

{#if error_visible}
    <div class="alert alert-error">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
        >
        <span>Resposta Errada</span>
    </div>
{:else if answered_visible}
    <div class="alert alert-warning">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            /></svg
        >
        <span>Você já respondeu esse desafio</span>
    </div>
{:else if success_visible}
    <div class="alert alert-success">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
        >
        <span>Parabén, você acertou, pode checar seus pontos</span>
    </div>
{/if}
