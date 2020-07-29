import { storeBlob } from "./storage"

export const handleNewImage = (req: Express.Request, res: Express.Response) => {
 storeBlob((req as any).body.image);
}
