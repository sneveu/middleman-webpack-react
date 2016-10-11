import ComponentName from './components/ComponentName';
import ContentfulExample from './components/ContentfulExample';

export class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img src="/assets/Head_40.png" />
        <ComponentName />
        <ContentfulExample />
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('content'));
