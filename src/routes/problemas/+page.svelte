<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="grid grid-cols-2 gap-7">
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">
            Cheche
        </div>
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Job</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each data.problems as p}    
                <tr>
                    <th>{p.id}</th>
                    <td>{p.title}</td>
                    <td>{p.points}</td>
                </tr>
                {/each}
            
            </tbody>
        </table>
    </div>
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">
            Cheche Creche
        </div>
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Job</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
