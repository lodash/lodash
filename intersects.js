import intersection from './intersection.js'
import isEmpty from './isEmpty.js'

function intersects(a1, a2) {
    return !isEmpty(intersection(a1, a2));
}

export default intersects