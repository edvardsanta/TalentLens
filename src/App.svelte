<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import FileUpload from './lib/FileUpload.svelte';
  let welcomeMessage: string = "Welcome to the Resume predict";
</script>

<main>
  <div class="home-page">
    <h1>{welcomeMessage}</h1>
    <FileUpload></FileUpload>
  </div>
</main>

<style>
  .home-page {
    text-align: center;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
</style>
