import { BlobServiceClient, BlobDownloadResponseModel, ContainerClient, BlockBlobClient } from "@azure/storage-blob";

let containerClient: ContainerClient = null;
let blockBlobClient: BlockBlobClient = null;

const STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=inkinghack;AccountKey=ardpwsTJWOb4dOTCdz1wThpi5CD2QTC8+4yG6HT3l3caXUwTl3HWWn1hl9ekz/eL52aJD2bCGMcgnYuAWQ01ag==;EndpointSuffix=core.windows.net';

export const initStorage = async () => {
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
      blockBlobClient = containerClient.getBlockBlobClient(blobName);
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

export const getBlob = async () => {
  try {
    const downloadBlockBlobResponse: BlobDownloadResponseModel = await blockBlobClient.download(0);
    const imageData = await streamToString(downloadBlockBlobResponse.readableStreamBody);

    return imageData;
  }
  catch (err) {
    console.error(err);
  }
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

