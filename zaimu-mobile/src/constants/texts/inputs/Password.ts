const passwordConstants = {
    label: 'Senha',
    labelConfirm: 'Confirmar Senha',
    placeholder: 'Senha',

    rules: {
        length: 'Mínimo 8 caracteres',
        number: 'Ao menos 1 número',
        lowercase: 'Ao menos 1 letra minúscula',
        uppercase: 'Ao menos 1 letra maiúscula',
        special: 'Ao menos 1 caractere especial: ( ! * @ ~ . etc )',
    },

    allRules: 'A senha deve conter pelo menos:\n ' +
        '- 8 caracteres\n ' +
        '- 1 número\n ' +
        '- 1 letra maiúscula\n ' +
        '- 1 letra minuscula\n ' +
        '- 1 caractere especial',

    errors: {
        required: 'Senha é obrigatória',
        tooWeak: 'Senha muito fraca',
        empty: 'O campo senha deve estar preenchido',
        requirements: 'Preencha o campo seguindo as regras abaixo',
    },

    strengthFeedback: {
        score0: 'Digite uma senha',
        score1: 'Senha fraca',
        score2: 'Senha fraca',
        score3: 'Senha média',
        score4: 'Senha boa',
        score5: 'Senha forte',
        suffix: 'Deve conter:',
    },

    colorInputs: {
        red: '#f91616',
        orange: '#F97316',
        yellow: '#FACC15',
        darkGreen: '#22C55E',
        green: '#10B981',
    },
}

export default passwordConstants