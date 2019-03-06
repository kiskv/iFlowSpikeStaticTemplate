/**
 *
 * Asynchronously loads the component for ControlPanel
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
