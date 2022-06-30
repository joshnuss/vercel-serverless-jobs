import { wrap } from '../wrap.js'
import handler from '../jobs/sendMail.js'

export default wrap(handler)
