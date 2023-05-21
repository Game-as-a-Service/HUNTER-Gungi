import EventBus from '../../usecases/eventBus';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ImplEventBus extends EventBus {
  broadcast(events) {
    // TODO: should implement
    events.forEach((event) => {
      console.log('有收到event囉');
    });
  }
}
