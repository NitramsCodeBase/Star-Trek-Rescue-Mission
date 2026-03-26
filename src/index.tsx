import { Tools } from './library/classes/Tools';
import { Settings } from './library/classes/Settings';
import { App } from './App';

import '../src/library/css/App.css';

Tools.renderComponent(
        <App 
            settings={Settings.getGameSettings()} 
        />
);