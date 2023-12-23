<script lang="ts">
    export let agreed: boolean = false;
  
    // Function to handle checkbox change
    function handleCheckboxChange(event: Event) {
      agreed = (event.target as HTMLInputElement).checked;
    }
  </script>
  
  <style>
    .agreement {
      margin-top: 15px;
    }
  
    .checkbox-label {
      margin-left: 5px;
      user-select: none; /* improves user experience */
    }
  </style>
  
  <div class="agreement">
    <input type="checkbox" id="agreementCheckbox" bind:checked={agreed} on:change={handleCheckboxChange} />
    <label class="checkbox-label" for="agreementCheckbox">
      I agree to share this file.
    </label>
  </div>
  