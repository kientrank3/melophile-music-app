declare module "colorthief" {
  export default class ColorThief {
    getColor(src: string, quality?: number): Promise<[number, number, number]>;
    getPalette(
      src: string,
      colorCount?: number,
      quality?: number
    ): Promise<[number, number, number][]>;
  }
}
