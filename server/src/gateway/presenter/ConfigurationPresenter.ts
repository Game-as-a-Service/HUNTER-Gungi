import Presenter from '../../usecases/Presenter';
import { Event } from '../../domain/events/Event';
import { ConfigurationEvent } from 'src/domain/events/ConfigurationEvent';

interface ConfigurationView {
  gungiHan: string;
}

export default class ConfigurationPresenter
  implements Presenter<ConfigurationView>
{
  present(events: Event[]): ConfigurationView {
    const target = events[0] as ConfigurationEvent;
    const gungiHan = target.data.gungiHan;
    return {
      // TODO 這邊亂寫的
      gungiHan: JSON.stringify(gungiHan),
    };
  }
}
