import Presenter from './Presenter';

// TODO: change method name "execute" to "present"
export default interface Usecase<Request> {
  present<View>(request: Request, presenter: Presenter<View>): Promise<View>;
}
