import BaseButton from '@components/base/BaseButton.vue'
import BaseCard from '@components/base/BaseCard.vue'
import BaseInput from '@components/base/BaseInput.vue'

export function registerGlobalComponents(app) {
  app.component('BaseButton', BaseButton)
  app.component('BaseCard', BaseCard)
  app.component('BaseInput', BaseInput)
}