import * as yup from 'yup';

const authFormSchema = yup.object().shape({
    registration: yup
        .string()
        .required('Informe sua matrícula')
        .matches(/^\d+$/g, 'Matrícula somente números sem espaço.'),

    password: yup.string()
        .required('Informe sua senha')
        .matches(/^\w+[-#@!&\+]{0,}\w+$/g, 'Senha contém caracteres não permitidos.')
});

const changePasswordFormSchema = yup.object().shape({
    password: yup.string()
        .required('Informe sua senha')
        .min(6, 'A senha deve conter no mínimo 6 caracteres')
        .max(16, 'A senha deve conter no máximo 16 caracteres')
        .matches(/^\w+[-#@!&\+]{0,}\w+$/g,
            'Somente letras, números e caracteres [-, #, @, !, &, +] são permitidos'
        ),

    passwordConfirm: yup.string()
        .required('Confirme sua senha')
        .oneOf([yup.ref('password'), null], 'Senhas são diferentes')
});

const areaNameFormSchema = yup.object().shape({
    areaName: yup
        .string()
        .required('Informe o nome da área')
        .matches(/^\w+[-#@!&\+]{0,}\w+$/g,
            'Somente letras, números e caracteres [-, #, @, !, &, +] são permitidos'
        )
});

export { authFormSchema, changePasswordFormSchema, areaNameFormSchema };
