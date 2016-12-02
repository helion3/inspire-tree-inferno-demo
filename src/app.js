import Component from 'inferno-component';
import data from './full.json';
import Inferno from 'inferno';
import Tree from './tree';
import './app.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <img src="./dist/inferno.png" height="120" width="120" />
                    <h2>Inspire Tree Inferno Demo</h2>
                </header>
                <p>This is a basic proof-of-concept which implements a native <a href="https://github.com/trueadm/inferno">Inferno</a> renderer for InspireTree.</p>
                <Tree nodes={data} />
            </div>
        );
    }
}
