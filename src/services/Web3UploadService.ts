import { pinata } from "../config/PinataConfig";


export const uploadToCloud = async (selectedFile: any) => {
    try {
        const upload = await pinata.upload.file(selectedFile)
        console.log(upload);
        return upload.IpfsHash;
    } catch (error) {
        console.log(error);
    }
};

export const getUrl = async (IpfsHash: any) => {
    const ipfsUrl = await pinata.gateways.convert(IpfsHash);
    console.log("url : ", ipfsUrl);
    return ipfsUrl;
}