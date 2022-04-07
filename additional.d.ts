declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOTION_API_KEY: string | undefined;
      NOTION_DATABASE_ID: string | undefined;
    }
  }
}
