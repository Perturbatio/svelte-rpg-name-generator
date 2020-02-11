import { rand } from './../helpers/random'

export default class SoftConsonantPair {
    get token() {
        return 'S'
    }

    get description() {
        return 'A soft consonant pair'
    }

    handle() {
        let values = [
            'ff', 'fl', 'fy',
            'gh', 'gn',
            'hm', 'hn', 'hy',
            'll', 'ly', 'lm',
            'ng', 'ph', 'sh', 'ss', 'yl', 'yr', 'zh',
        ]
        return values[rand( 0, values.length - 1 )]
    }
}
