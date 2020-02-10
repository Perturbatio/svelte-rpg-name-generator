import { rand } from './../helpers/random'
export default class LogicalGroup {
    get token() {
        return 'g'
    }

    get description() {
        return 'A set of letters best grouped together (works well for high fantasy names)'
    }

    handle() {
        let values = [
            'ath', 'ars',
            'bha', 'bhe', 'bhi', 'bho', 'bhu',
            'qua', 'que', 'què', 'qui', 'quo',
            'zha', 'zhe', 'zhè', 'zhi', 'zho', 'zhu'
        ]

        return values[rand( 0, values.length - 1 )]
    }
}
