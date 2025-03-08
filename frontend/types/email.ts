type EmailType = {
    from_email : string,
    from_name : string,
    subject : string,
    body : string,
    status : string,
    type : string,
    date : string,
}

type SendEmailRequest = {
    to : string,
    cc : string,
    bcc : string,
    subject : string,
    body : string,
}

export type { EmailType, SendEmailRequest }
