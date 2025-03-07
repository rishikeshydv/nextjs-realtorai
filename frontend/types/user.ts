type SignupUser = {
    email: string;
    name: string;
    password: string;
    confirm_password: string;
};

type SignInData = {
    email: string;
    password: string;
};

export type { SignupUser, SignInData };