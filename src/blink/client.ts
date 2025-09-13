import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'cv-blinder-by-GO-TECH',
  authRequired: true
})

export default blink