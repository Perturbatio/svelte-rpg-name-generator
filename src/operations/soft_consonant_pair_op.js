export default class SoftConsonantPair {
    get token() {
        return 'S'
    }

    get description() {
        return 'A soft consonant pair'
    }

    handle() {
        let values = [
            'll', 'ly', 'sh', 'zh', 'yr', 'fy',
            'ff', 'ss', 'hy', 'fl', 'yl',
            'ph', 'hn', 'hm'
        ]

        return values[parseInt( Math.random() * values.length, 10 )]
    }
}
