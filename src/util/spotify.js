let accessToken;
const clientID = "db974ce7e8b84a4f9bb44caa7b64a14e";
const redirectURI = "http://localhost:3000/";
export const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/access_token=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = expiresInMatch[1];

            //clears values, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;
        }
    },

     search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {  Authorization: `Bearer ${accessToken}` }
    }).then(response => {
        return response.json()
    }).then(jsonResponse => {
        if(!jsonResponse.tracks) {
            return [];  
        }
       
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    });

},
    savePlaylist(playlistName, trackUris) {
        if(!playlistName || !trackUris) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;
        userID = fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(jsonResponse => { userID= jsonResponse.id;} );
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName}).then(response=> response.json()
            ).then(jsonResponse => { 
                const playListId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            }
            )
        })
            
    }
        
}
    




export default Spotify;