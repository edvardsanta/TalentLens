<script lang="ts">
  import { type Writable } from 'svelte/store';
  export let filesToUpload: Writable<FileStatus[]>

  // Function to handle the file submission
  async function submitFiles() {
    if (filesToUpload > 0) {
      // Implement your file upload logic here

      // After uploading, redirect to the file info page
      window.location.href = "/file-info"; // Adjust this URL as needed
    }
  }
</script>

<button on:click={submitFiles} disabled={filesToUpload.length === 0}>
  Upload Files
</button>
