import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
      JWT_SECRET: (process.env.JWT_SECRET == undefined) ? 'DUMMY' : process.env.JWT_SECRET,
      ACCESS_TOKEN_SECRET:(process.env.ACCESS_TOKEN_SECRET==undefined)? 'DUMMY':process.env.ACCESS_TOKEN_SECRET,
       PROJECT_KEY_GENERATION_SECRET:(process.env.PROJECT_KEY_GENERATION_SECRET==undefined)? 'DUMMY':process.env.PROJECT_KEY_GENERATION_SECRET,
      REFRESH_TOKEN_SECRET:(process.env.REFRESH_TOKEN_SECRET==undefined)?'DUMMY':process.env.REFRESH_TOKEN_SECRET,
} 
  