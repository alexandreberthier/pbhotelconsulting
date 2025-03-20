<template>
  <div
      role="combobox"
      :aria-expanded="showOptions"
      aria-haspopup="listbox"
      aria-label="Select language"
      tabindex="0"
      ref="dropdown"
      @keydown="handleKeyDown"
      class="drop-wrapper">
    <div

        @click="toggleOptions"
        class="visible">
      <div class="icon-wrapper">
        <img
            aria-hidden="true"
            class="icon"
            :src="getImage('ic_language.png')"
            alt="">
      </div>
      <p>{{ selectedOption }}</p>
    </div>
    <div
        role="listbox"
        v-show="showOptions"
        class="hidden"
    >
      <p
          role="option"
          :class="['option', {'selected': index === currentIndex}]"
          v-for="(option, index) in filteredOptions"
          :aria-selected="index === currentIndex ? 'true' : 'false'"
          :key="index"
          @click="selectOption(option)"
      >
        {{ option.text }}
      </p>
    </div>
  </div>
</template>

<script setup generic="T" lang="ts">
import {getImage} from "@/utils/ImageUtils.ts";
import {computed, type ComputedRef, type ModelRef, onMounted, onUnmounted, type Ref, ref, useTemplateRef} from "vue";
import {useI18n} from "vue-i18n";

export interface Option<T> {
  text: string,
  value: T
}

const {options} = defineProps<{
  options: Option<T>[]
}>()

const {t} = useI18n()

const dropdown = useTemplateRef<HTMLDivElement>('dropdown')
const showOptions: Ref<boolean> = ref(false)
const selectedOptionValue: ModelRef<T | undefined> = defineModel('selectedValue')

const selectedOption: ComputedRef<string> = computed(() => {
  const selected = options.find(option => option.value === selectedOptionValue.value)
  if (!selected) {
    return t('selectOption')
  }
  return selected.text
})

const filteredOptions: ComputedRef<Option<T>[]> = computed(() => {
  return options.filter(option => option.value !== selectedOptionValue.value)
})

function selectOption(option: Option<T>) {
  selectedOptionValue.value = option.value
  closeOptions()
}

const currentIndex = ref(-1)

function handleKeyDown(event: KeyboardEvent) {

  switch (event.key) {
    case 'Enter':
      if (!showOptions.value) {
        toggleOptions();
        currentIndex.value = 0;
      } else if (currentIndex.value !== -1) {
        selectOption(filteredOptions.value[currentIndex.value]);
      }
      break;

    case 'ArrowDown':
      if (showOptions.value) {
        currentIndex.value = (currentIndex.value + 1) % filteredOptions.value.length;
      } else {
        toggleOptions();
      }
      break;

    case 'ArrowUp':
      if (showOptions.value) {
        currentIndex.value = (currentIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length;
      }
      break;

    case 'Escape':
      closeOptions();
      break;
  }
}

function toggleOptions() {
  showOptions.value = !showOptions.value
}

function closeOptions() {
  showOptions.value = false
}

function closeDropDown(event: Event) {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    closeOptions()
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropDown);
})

onUnmounted(() => {
  document.removeEventListener("click", closeDropDown);
})

</script>

<style scoped>

.drop-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  position: relative;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid var(--gray);

  &:focus {
    outline: 2px solid var(--pink);
  }


  .visible {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    background: var(--white);

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  .hidden {
    position: absolute;
    top: 110%;
    left: -1px;
    border: 1px solid var(--gray);
    border-radius: 4px;
    width: 100%;
    padding: 6px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 8px;

    .option {
      &.selected {
        background: var(--lightgray);
      }

      &:hover {
        background: var(--lightgray);
      }
    }
  }
}

</style>