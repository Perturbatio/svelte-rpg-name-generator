import { rand } from './../helpers/random'

export default class ElfFemaleStart {
    get token() {
        return 'f'
    }

    get description() {
        return 'The beginning of an elven style name'
    }

    handle() {
        let values = [
            'Afeli', 'Aglora', 'Aila', 'Alia', 'Alea', 'Alara', 'Aleni', 'Ama', 'Amea', 'Amie', 'Amo', 'Amuri', 'Ana',
            'Anda', 'Ane', 'Anuri', 'Anuria', 'Ara', 'Are', 'Ari', 'Aria', 'Arie', 'Asa', 'Asie', 'Assa', 'Assie',
            'Atha', 'Athe', 'Athi', 'Athie', 'Athia', 'Atho', 'Ar',

            'Eda', 'Ede', 'Edi', 'Edo', 'Edae', 'Edari', 'Edera', 'Edere', 'Ederi', 'Edesi', 'Edesil', 'Efeli', 'Elia',
            'Elea', 'Eleni', 'Elara', 'Ela', 'Ema', 'Emara', 'Emari', 'Emeri', 'Emera','Emela', 'Emeli', 'Ena', 'Enara',
            'Enari', 'Eanara', 'Eanari', 'Eina',

            'Fala', 'Faila', 'Faili', 'Faeli', 'Faela', 'Faera', 'Faesh', 'Fahli', 'Fehli', 'Fai', 'Fae', 'Fea', 'Feala',
            'Fiela', 'Faile',

            'Gala', 'Gale', 'Gali', 'Galo', 'Galae', 'Galie', 'Galea', 'Galeo', 'Glo', 'Glorf', 'Glari', 'Glora', 'Glori',
            'Glorea', 'Glorie', 'Gwa', 'Gwe', 'Gwi', 'Gwo', 'Gwena', 'Gwene', 'Gweni'

        ]

        return values[rand( 0, values.length - 1 )]
    }
}
