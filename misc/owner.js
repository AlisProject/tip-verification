import { MSAToken } from './helper';

MSAToken.methods.owner().call({
    from: process.env.POA_CHAIN_ADMIN_PUBLIC_KEY,
  },
  (error, result) => {
    console.log(result);
    console.log(error);
  },
);

