import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Email invalide')
    .required('Email est obligatoire'),
  password: Yup.string()
    .required('Mot de passe obligatoire')
});
