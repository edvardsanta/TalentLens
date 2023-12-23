<script lang="ts">
  import { writable } from 'svelte/store';
  import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import AgreementCheckbox from './AgreementCheckbox.svelte';
  import SubmitButton from './SubmitButton.svelte';

  let fileStatuses = writable<FileStatus[]>([]);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const statuses = files.map(file => ({
        file,
        isValid: file.size <= MAX_FILE_SIZE
      }));

      fileStatuses.set(statuses);
    }
  }
</script>

<div class="container mt-4">
  <input type="file" multiple class="form-control" on:change={handleFileChange} />
  <ul class="list-unstyled mt-3">
    {#each $fileStatuses as { file, isValid }}
      <li class="d-flex justify-content-between align-items-center">
        <span class={isValid ? 'text-success' : 'text-danger'}>
          {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
        </span>
        <Fa icon={isValid ? faCheck : faTimes} class={isValid ? 'text-success' : 'text-danger'} />
      </li>
    {/each}
  </ul>
  <AgreementCheckbox />
  <SubmitButton filesToUpload={fileStatuses} />
</div>
