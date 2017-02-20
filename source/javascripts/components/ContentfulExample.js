import contentful from 'contentful';
import showdown from 'showdown';

class ContentfulExample extends React.Component {

  //
  // React fn
  // -------------------------------------------------

  constructor(props) {
    super(props);

    this.state = {
      client: null,
      ready: false
    }
  }

  componentWillMount() {
    this._getContent()
  }

  //
  // Custom fn
  // -------------------------------------------------

  _getContent() {

    const self = this;

    self.state.client = contentful.createClient({
      space: 'mo94git5zcq9',
      accessToken: 'b933b531a7f37efbfc68838d24b416ddb3d53ea16377606045d3bfcdf705b0fb'
    })

    self.state.client.getEntries()
    .then(function (response) {

      self.setState({
        content: response.items
      })
    })

  }

  //
  // Render fn
  // -------------------------------------------------

  __loading() {

    return (
      <h1>Loading...</h1>
    );
  }

  __ready() {

    const self = this;

    var entries;

    console.log(this.state.content);

    entries = this.state.content.map((entry, index) => {

      var title = entry.fields.title,
          markdown = new showdown.Converter(),
          body = markdown.makeHtml(entry.fields.body),
          image;

      if (entry.fields.image)
        image = (
          <img src={entry.fields.image.fields.file.url} />
        );

      return (
        <div key={"item"+index}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{__html: body}}></div>
          {image}
        </div>
      );
    })

    return (
      <div>
        {entries}
      </div>
    );
  }

  render() {
    if (this.state.content) {
      return this.__ready()
    } else {
      return this.__loading()
    }
  }

};

export default ContentfulExample;
