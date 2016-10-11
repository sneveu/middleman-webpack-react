import _ from 'underscore';
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
      space: 'csauqk4iienq',
      accessToken: '8d649a3ee08462a6c88bab51eb61c04de055bc4182b4c84f994febfa71bcef4d'
    })

    self.state.client.getEntries({
      content_type: 'portfolio'
    })
    .then(function (response) {

      self.setState({
        content: response.items[0].fields
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

    var tracklist, class_intro = this.state.ready ? 'container' : 'container is-intro';
    
    tracklist = _.map(self.state.content.songs, function (song, i) {
      
      song = song.fields;

      if (song.track) {
        return (
          <li className="tracklist--item can-play" key={"track-"+i}>
            <a href={song.track} target="_blank">
              <span className="track-title">{song.title}</span>
              <span className="credit">{song.credit}</span>
              <span className="fa fa-play-circle play-btn">▶</span>
            </a>
          </li> 
        )
      } else {
        return (
          <li className="tracklist--item" key={"track-"+i}>
            <span className="track-title">{song.title}</span>
            <span className="credit">{song.credit}</span>
          </li> 
        )
      }
      
    });

    var markdown = new showdown.Converter();
    var bio = markdown.makeHtml(self.state.content.biography);
    var email = self.state.content.emailAddress;

    return (
      <main className={class_intro}>

        <header className='page-header'>
          <div className='span-col-4 align-bottom'>
            <h1 className='main-title'>David Oversby-Powell</h1>
          </div>
          <div className='span-col-4 copy align-bottom hide-for-intro'>
            <a href={"mailto:"+email}>{email}</a>
          </div>
          <div className='span-col-4 copy align-bottom hide-for-intro'>
            {this.state.content.phoneNumber}
          </div>
        </header>

        <section className='page-wrapper hide-for-intro'>
          <div className='span-col-4' dangerouslySetInnerHTML={{__html: bio}}></div>
          <div className="span-col-8">
            <ul className="tracklist display">
              {tracklist}
            </ul>
          </div>
        </section>

      </main>
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