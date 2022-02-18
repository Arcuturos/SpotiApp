import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
  console.log('spotify service listo');
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;
    
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQDEiBkufOYM09dnAUmbYW7BQhAaodpUXcrDHHUlWsMIei2OP6nSQxYfYL775YS_p3kEF5K_Xinoe-wjgQc'
    });
    return this.http.get(url,{headers});
  }
  getNewReleases(){

   /* const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQCbk6d5P1JlpCd4lrTG5cpHq8NcftDcTZZtJLEULHGQ4P3Q5bnVmYXtHqFnt7xomwFbSZ9Hgk7RO_ntbfo'
    }) */
    return this.getQuery('browse/new-releases')
      .pipe(map(data => data['albums'].items));
    /*this.http.get(`${url}browse/new-releases`, {headers})
    .pipe( map(data =>data['albums'].items
    ));*/

  }
getArtistas(termino: string){
  /*const headers = new HttpHeaders({
    'Authorization' : 'Bearer BQCbk6d5P1JlpCd4lrTG5cpHq8NcftDcTZZtJLEULHGQ4P3Q5bnVmYXtHqFnt7xomwFbSZ9Hgk7RO_ntbfo'
  })*/
  /* return this.http.get(`https://api.spotify.com/v1/search?query=${ termino }&type=artist&offset=15&limit=20`, {headers})
   .pipe(map(data => data['artists'].items
   ));*/
   return this.getQuery(`search?query=${ termino }&type=artist&offset=15&limit=20`)
   .pipe(map(data => data['artists'].items));
}
getArtista(id: string){

  return this.getQuery(`artists/${ id }`);

}
getTopTracks(id: string){

  return this.getQuery(`artists/${ id }/top-tracks?country=us`)
  .pipe(map(data => data['tracks']));


}

}
