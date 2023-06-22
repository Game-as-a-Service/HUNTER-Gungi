import Presenter from './Presenter';

export default interface Usecase<Request> {
  execute<View>(request: Request, presenter: Presenter<View>): Promise<View>;
}
