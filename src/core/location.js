import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
const emptyFunction = function () {};

export default canUseDOM ? useQueries(createHistory)({}) : { listen: emptyFunction };
