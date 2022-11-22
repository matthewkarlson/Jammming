
import React from 'react';
import './App.css';
import {SearchBar} from './../SearchBar/SearchBar.js'
import {SearchResults} from './../SearchResults/SearchResults.js'
import {Playlist} from './../Playlist/Playlist.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [{  name: 'name', artist: 'artist', album: 'album', id: 1  }, {  name: 'name2', artist: 'artist2', album: 'album2', id: 2  }] ,
     playlistName: 'My Playlist',
    playlistTracks: [{  name: 'pl1', artist: 'artist', album: 'album', id: 1  }, {  name: 'pl2', artist: 'artist2', album: 'album2', id: 2  }] };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
}
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else tracks.push(track);
    this.setState({playlistTracks: tracks});
}
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    
    this.setState({playlistTracks: tracks.filter(savedTrack => savedTrack.id !=track.id)});
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  render() {
   return <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div class="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>
      <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove ={this.removeTrack} onNameChange = {this.updatePlaylistName}/>
    </div>
  </div>
</div>  
  }
}
export default App;
