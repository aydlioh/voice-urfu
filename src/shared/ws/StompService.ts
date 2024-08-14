import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { TokenService } from '../api/services';

interface StompServiceOptions {
  debug?: boolean;
  debugName?: string | null;
}

export class StompService {
  private socket;
  private stompClient;
  private headers;

  constructor(url: string, options: StompServiceOptions = { debug: false }) {
    this.socket = new SockJS(url);
    this.stompClient = Stomp.over(() => this.socket);
    this.stompClient.debug = (log: string) => {
      if (!options.debug) {
        return;
      }

      const message = JSON.stringify(log);

      if (message.includes('SUBSCRIBE')) {
        window.console.log(
          `\x1b[1m\x1b[32m${options.debugName ?? ''}\x1b[0m ${log}`
        );
      } else if (message.includes('DISCONNECT')) {
        window.console.log(
          `\x1b[1m\x1b[31m${options.debugName ?? ''}\x1b[0m ${log}`
        );
      }

      return;
    };

    this.headers = {
      Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
    };
  }

  connect(callback: () => void) {
    this.stompClient.connect(this.headers, callback);
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  subscribe<T>({ url }: { url: string }, callback: (m: T) => void) {
    this.stompClient.subscribe(url, (output: { body: string }) => {
      const message = JSON.parse(output.body);
      callback(message);
    });
  }

  send({ url, body }: { url: string; body: object }) {
    this.stompClient.send(url, {}, JSON.stringify(body));
  }

  get connected() {
    return this.stompClient.connected;
  }
}
