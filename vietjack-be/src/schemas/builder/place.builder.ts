import { Place } from '@/schemas/place.schema';

export class PlaceBuilder {
  private readonly instance: Place;

  constructor() {
    this.instance = new Place();
  }

  title(title: string) {
    this.instance.title = title;
    return this;
  }

  code(code: string) {
    this.instance.code = code;
    return this;
  }

  build() {
    return this.instance;
  }
}
