/** 환경변수를 자동완성 */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OMDB_API_KEY: string
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_SITE_NAME: string
      JSON_SERVER_API_URL: string
    }
  }
}