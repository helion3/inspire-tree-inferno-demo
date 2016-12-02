import classNames from 'classnames';
import Component from 'inferno-component';
import Inferno from 'inferno';
import InspireTree from 'inspire-tree/dist/inspire-tree-core-bundled';
import 'inspire-tree/dist/inspire-tree.css';

// An example Tree component which wraps InspireTree's core.
// We've excluded the default DOM code so we can implement native React rendering.
export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    // When this component mounts, instatiate inspire tree
    componentWillMount() {
        var component = this;
        var batching = 0;

        component.tree = new InspireTree({
            data: component.props.nodes,
            renderer: function(tree) {
                return {
                    applyChanges: component.syncNodes.bind(component),
                    attach: function() {},
                    batch: function() {
                        batching++;
                    },
                    end: function() {
                        batching--;

                        if (batching === 0) {
                            component.syncNodes();
                        }
                    }
                }
            }
        });

        // Set the initial state once the tree has fully loaded our data
        component.tree.on('model.loaded', component.syncNodes.bind(component));
    }

    // Update the state when changes have been made to our nodes
    syncNodes() {
        this.setState({
            data: this.tree.nodes()
        });
    }

    // A recursive function to render an OL of nodes.
    renderOl(nodes) {
        var items = [];

        // For every node
        (nodes || []).forEach((node) => {
            // Only render if node is available
            if (node.available()) {
                // Build an OL for all children of this node
                var children;
                if (node.expanded() && node.hasChildren()) {
                    children = this.renderOl(node.children);
                }

                // Build a toggle anchor only for nodes with children
                var toggle;
                if (node.children) {
                    toggle = <a className={'toggle icon ' + (node.expanded() ? 'icon-collapse' : 'icon-expand')} onClick={node.toggleCollapse.bind(node)}></a>
                }

                // Push an LI for this node.
                items.push(<li className={classNames({
                    expanded: node.expanded(),
                    folder: node.children,
                    leaf: !node.children,
                    selected: node.selected()
                })} key={node.id}>
                    <div className='title-wrap'>
                        {toggle}
                        <a className={'title icon ' + (node.children ? 'icon-folder' : 'icon-file-empty')} onClick={node.toggleSelect.bind(node)}>
                            {node.text}
                        </a>
                    </div>
                    <div className='wholerow'></div>
                    {children}
                </li>);
            }
        });

        return (<ol>{items}</ol>);
    }

    // Renders the wrapping div and root OL
    render() {
        return (
            <div className="inspire-tree">
                {this.renderOl(this.state.data)}
            </div>
        );
    }
}
