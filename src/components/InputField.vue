<template>
  <div class="inp-outer-wrapper">
    <div class="inp">
      <label :for="id">{{ t(computedConfig.label) }}</label>
      <textarea v-if="computedConfig.type === 'textarea'"
          v-model="input"
          :name="computedConfig.label"
          :placeholder="computedConfig.placeholder"
          :id="id"
          cols="30"
          rows="10">

      </textarea>
      <input v-else
          v-model="input"
          :type="computedConfig.type"
          :name="computedConfig.label"
          :placeholder="computedConfig.placeholder"
          :id="id"
      >
      <div class="line"></div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed, type ComputedRef, type ModelRef, watch} from "vue";

import {type Config, inputConfig, InputType} from "@/components/InputFieldConfig.ts"
import {useI18n} from "vue-i18n";

const input: ModelRef<string | undefined> = defineModel('input')
const error: ModelRef<string | undefined> = defineModel('error')

const {inputType} = defineProps<{
  inputType: InputType
}>()

const {t} = useI18n()


const computedConfig: ComputedRef<Config> = computed(() => inputConfig.value[inputType])

const id = computed(() => `${computedConfig.value.label}-id`)

function validateField() {
  if (!computedConfig.value.validate) return

  let userInput = input.value?.trim() || ''

  error.value = computedConfig.value.validate(userInput) ? undefined : computedConfig.value.error
}

watch(input, (newValue) => {
  if (!newValue?.trim()) {
    error.value = undefined;
  } else {
    validateField()
  }
})

defineExpose({validateField})


</script>

<style scoped>

.inp-outer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  position: relative;
  flex: 1 1 340px;

  .inp {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      visibility: hidden;
      position: absolute;
    }

    textarea {
      font-size: 18px;
      font-family: OpenSans, sans-serif;
      margin: 0;
      padding: 15px 10px;
      background: transparent;
      border: none;

      &::placeholder {
        color: var(--darkgray);
        font-size: 20px;
      }
    }

    input {
      font-size: 18px;
      font-family: OpenSans, sans-serif;
      margin: 0;
      padding: 15px 10px;
      background: transparent;
      border: none;

      &::placeholder {
        color: var(--darkgray);
        font-size: 20px;
      }

      &:focus {
        outline: 1px solid var(--darkgray);
      }
    }

    &:hover {
      .line {
        &:after  {
          width: 100%;
        }
      }
    }

    .line {
      height: 3px;
      background: var(--darkgray);
      width: 100%;
      position: relative;

      &:after {
        content: '';
        top: 0;
        position: absolute;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--darkblue);
        transition: all 250ms ease-in-out;
      }
    }
  }


  .error {
    font-size: 16px;
    color: red;
  }
}

.inp-outer-wrapper:focus-within .line:after {
  width: 100%;
}

@media (min-width: 1200px) {
  .inp-outer-wrapper {
    flex: 1 1 500px;
  }
}

</style>