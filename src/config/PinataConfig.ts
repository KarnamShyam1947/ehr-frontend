import { PinataSDK } from "pinata-web3"

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY}`
})