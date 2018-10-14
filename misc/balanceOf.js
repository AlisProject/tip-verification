import { MSAToken } from './helper';

MSAToken.methods.balanceOf(process.env.POA_CHAIN_ADMIN_PUBLIC_KEY).call({
    from: process.env.POA_CHAIN_ADMIN_PUBLIC_KEY,
  },
  (error, result) => {
    console.log(result);
    console.log(error);
  },
);

