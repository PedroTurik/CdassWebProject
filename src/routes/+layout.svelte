<script>
    import "../app.css";
    import NavBar from "$lib/components/NavBar.svelte";
    import { user, userData } from "$lib/firebase";

    $user
    $userData

</script>

<NavBar />

<slot />
