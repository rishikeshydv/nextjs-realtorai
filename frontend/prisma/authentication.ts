import { SignupUser } from '@/types/SignupUser';
import pool from './pool';
import bcrypt from 'bcrypt'

type LoginCredentials = {
    email: string;
    password: string;
}

//check if the table exists else create it
async function CheckTableExists() {
    const result = await pool.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'users'
        ) AS exists;
      `);
    
      const tableExists = result.rows[0]?.exists;
    
      if (!tableExists) {
        await pool.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            phone VARCHAR(255),
            role VARCHAR(255),
            subscription VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
      }}

  async function CheckEmail(email: string): Promise<string> {
    const result = await pool.query(
      `SELECT 1 FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    return result.rows.length > 0 ? "User Already Exists" : "User Not Found";
  }


  async function SaveCredentials(credentials: SignupUser): Promise<string> {
    await CheckTableExists();
  
      const res = await CheckEmail(credentials.email);
      if (res === "User Already Exists") {
        return "User Already Exists";
      }
  
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
  
      await pool.query(
        `INSERT INTO users (firstName, lastName, email, password, phone, role, subscription)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          credentials.firstName,
          credentials.lastName,
          credentials.email,
          hashedPassword,
          credentials.phone,
          credentials.role,
          credentials.subscription
        ]
      );
  
      return "User Created";

  }


  async function CheckCredentials(credentials: LoginCredentials): Promise<string> {
    await CheckTableExists();
  
    const result = await pool.query(
      `SELECT password FROM users WHERE email = $1 LIMIT 1`,
      [credentials.email]
    );
  
    if (result.rows.length === 0) {
      return "User Not Found";
    }
  
    const hashedPassword = result.rows[0].password;
    const isPasswordCorrect = await bcrypt.compare(credentials.password, hashedPassword);
  
    return isPasswordCorrect ? "Login Successful" : "Incorrect Password";
  }

  //get user by email
  async function GetUserByEmail(email: string): Promise<SignupUser> {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
  
    if (result.rows.length === 0) {
      throw new Error("User Not Found");
    }
  
    return result.rows[0];
  }

  //update password based on user's email
  async function UpdatePassword(email: string, newPassword: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    await pool.query(
      `UPDATE users SET password = $1 WHERE email = $2`,
      [hashedPassword, email]
    );
  
    return "Password Updated";
  }

// async function CheckGoogle(email: string):Promise<string>{
//     const user = await myClient.user.findUnique({   //here .user is the table name 'User'
//         where:{
//             email:email,
//         }
//     })
//     if (!user){
//         return "User Not Found"
//     } else {
//         return "User Found"
//     }

// }

// async function SaveGoogle(email: string):Promise<string>{
//     try {
//         await myClient.user.create({
//             data:{
//                 firstName:"Google",
//                 lastName:"User",
//                 email:email,
//                 password:"GoogleUser",
//             }
//         })
//         return "User Created"
//     } catch (e) {
//         console.log({e})
//         return "Error"
//     }
// }

// export { SaveCredentials, CheckCredentials, GetUserByEmail ,CheckGoogle, SaveGoogle, UpdatePassword};
export { SaveCredentials, CheckCredentials, GetUserByEmail, UpdatePassword };
//export { SaveCredentials, CheckGoogle, SaveGoogle};