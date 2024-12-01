export enum EventKeys {
  EDITOR_FORMAT_DOCUMENT = 'EDITOR_FORMAT_DOCUMENT',
  EDITOR_FILE_EXPLORE_COLLAPSE_SMALL = 'editor:file-explore-collapse-small',
  EDITOR_COLLAPSE_FOLDER_TOGGLE = 'EDITOR_COLLAPSE_FOLDER_TOGGLE',
}

class EventHelper {
  dispatch<T = any>(key: string, detail?: T) {
    window.dispatchEvent(new CustomEvent<T>(key, { detail }));
  }

  subscriber<T = any>(key: string, handler: (params: CustomEvent<T>) => void) {
    window.addEventListener(key, handler as never);
    return () => this.remove(key, handler);
  }

  remove(key: string, handler: any) {
    window.removeEventListener(key, handler);
  }
}

export default new EventHelper();
