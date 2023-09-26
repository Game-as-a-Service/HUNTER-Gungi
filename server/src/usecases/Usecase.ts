import Presenter from './Presenter';

export default interface Usecase<Request> {
  present<View>(request: Request, presenter: Presenter<View>): Promise<View>;
}
