
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface Asset {
  id: string;
  url: string;
  caption: string;
  tags: string;
  type: 'image' | 'video';
}

export async function getAssets(): Promise<Asset[]> {
  const filePath = path.join(process.cwd(), 'assets.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return new Promise((resolve, reject) => {
    Papa.parse<Asset>(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
