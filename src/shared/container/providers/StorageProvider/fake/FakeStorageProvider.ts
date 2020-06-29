import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storagedFile => storagedFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default DiskStorageProvider;
