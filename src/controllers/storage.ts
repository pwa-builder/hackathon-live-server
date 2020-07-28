import { BlobServiceClient } from "@azure/storage-blob";

let containerClient: any = null;

export const initStorage = async () => {
  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);

  const containerName = `newcontainer${new Date().getTime()}`;
  containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
}

export const storeBlob = async (imageContent: any) => {
  if (containerClient) {

    try {
      const blobName = "newblob" + new Date().getTime();
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.upload(imageContent, Buffer.byteLength(imageContent));
      console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }
    catch (err) {
      console.error(err);
    }
  }
  else {
    console.error('No container client');
  }
}


