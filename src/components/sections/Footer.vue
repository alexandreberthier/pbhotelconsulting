<template>
  <div class="footer-wrapper">
    <SectionLayout>
      <div class="inner-wrapper">
        <div class="top">
          <div class="left">
            <h2>{{ t('getInTouch') }}</h2>
            <a class="mail" href="mailto:doctor@pbhotelconsulting.com" target="_blank">
              <p>doctor@pbhotelconsulting.com</p>
            </a>
          </div>
          <div class="socials">
            <a
                class="social"
                v-for="(social, index) in socials"
                :key="index"
                :href="social.href"
                target="_blank"
            >
              <img :src="getImage(social.image)" alt="">
            </a>
          </div>
        </div>
        <div class="form-wrapper">
          <div class="form">
            <InputField
                ref="nameRef"
                :input-type="InputType.Name"
                v-model:input="name"
            />
            <InputField
                ref="companyRef"
                :input-type="InputType.Organization"
                v-model:input="company"
            />
            <InputField
                ref="emailRef"
                :input-type="InputType.Email"
                v-model:input="email"
            />
            <InputField
                :input-type="InputType.Phone"
                v-model:input="phone"
            />
            <InputField
                ref="messageRef"
                :input-type="InputType.TextArea"
                v-model:input="message"
            />
          </div>
          <DynamicButton :is-loading="isLoading" @click="send"/>
        </div>
      </div>
    </SectionLayout>
  </div>
</template>

<script setup lang="ts">
import SectionLayout from "@/components/layouts/SectionLayout.vue";
import {nextTick, type Ref, ref, useTemplateRef} from "vue";
import {getImage} from "@/utils/ImageUtils.ts";
import InputField from "@/components/InputField.vue";
import {InputType} from "@/components/InputFieldConfig.ts";
import DynamicButton from "@/components/DynamicButton.vue";
import {useI18n} from "vue-i18n";

interface Social {
  href: string,
  image: string
}

interface InputField {
  validateField: () => boolean
}

const {t}= useI18n()

const socials: Ref<Social[]> = ref([
  {
    href: 'https://www.linkedin.com/in/pberthier/',
    image: 'ic_linkedin.png'
  },
  {
    href: 'https://x.com/pbhconsulting',
    image: 'ic_x.png'
  }
])

const name: Ref<string> = ref('')
const company: Ref<string> = ref('')
const email: Ref<string> = ref('')
const phone: Ref<string> = ref('')
const message: Ref<string> = ref('')

const nameRef = useTemplateRef<InputField>('nameRef')
const companyRef = useTemplateRef<InputField>('companyRef')
const emailRef = useTemplateRef<InputField>('emailRef')
const messageRef = useTemplateRef<InputField>('messageRef')

const isLoading: Ref<boolean> = ref(false)


async function send() {
  isLoading.value = true;

  const inputRefs = [nameRef.value, companyRef.value, emailRef.value, messageRef.value]

  inputRefs.forEach(ref => ref?.validateField())

  await nextTick()


  const firstError = document.querySelector('.error');
  if (firstError) {
    firstError.scrollIntoView({behavior: "smooth", block: "center"})
    isLoading.value = false;
    return
  }

  setTimeout(() => {
    isLoading.value = false;
    alert('Gesendet!')
  }, 2000)
}


</script>

<style scoped>

.footer-wrapper {
  width: 100%;
  background: var(--lightgray);
  display: flex;
  justify-content: center;
  align-items: center;

  .inner-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 60px 0;

    .top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32px;

      .left {
        display: flex;
        flex-direction: column;

        .mail {
          position: relative;

          &:after {
            content: '';
            background: var(--darkgray);
            height: 2px;
            width: 100%;
            position: absolute;
            left: 0;
            transition: all 250ms ease-in-out;
          }

          &:hover {
            &:after {
              width: 0;
            }
          }
        }
      }

      .socials {
        display: flex;
        align-items: center;
        gap: 16px;

        .social {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 50px;
            height: 50px;
            transition: all 250ms ease-in-out;
          }

          &:hover {
            img {
              transform: scale(1.15);
            }
          }
        }
      }
    }

    .form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 32px;
      align-items: flex-end;


      .form {
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        width: 100%;
      }
    }

  }
}

</style>