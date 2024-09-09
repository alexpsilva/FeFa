import { IncomingHttpHeaders } from "http";

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface QueryString {
  [key: string]: undefined | string | string[] | QueryString | QueryString[];
}

export type HTTPRequest = {
  headers: IncomingHttpHeaders;
  cookies: Record<string, string>;
  params: Record<string, string>;
  query: QueryString;
  body: Record<string, string>;
};

export interface HTTPResponse extends NodeJS.WritableStream {
  set: (key: string, value: string) => void;
  status: (code: number) => void;
  send: (body: string) => void;
  redirect(url: string): void;
  redirect(status: number, url: string): void;
  cookie: (name: string, value: string, options: {httpOnly: boolean, secure: boolean}) => void;
  clearCookie: (name: string) => void;
  locals: Record<string, any>;
}

export type HTTPMiddlewareResult = { type: 'continue' } | { type: 'stop' }