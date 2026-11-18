/** Идентификаторы основных разделов в меню и URL. */
export type PageId = 'home' | 'about' | 'projects';

/** Тексты хедера, главной страницы и заголовка вкладки для одного языка. */
export interface SiteCopy {
  name: string;
  description: string;
  navigation: string;
  language: string;
  switchLanguage: string;
  pages: Record<PageId, string>;
}
