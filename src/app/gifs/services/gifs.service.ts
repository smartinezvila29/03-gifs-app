import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] = [];
  private apiKey : string = 'mFckuplMCuRYyR5nim3uHcqreUgnJuQa';
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs';
  public gifList : Gif[] = [];

  constructor(private http: HttpClient) { }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory( tag : string){
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagHistory.splice(0, 10);
  }

  public searchTag( tag: string ): void{
    if(tag.length === 0){
      return ;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10')

    this.http.get<SearchResponse>( `${ this.serviceUrl }/search`, { params })
    .subscribe(resp => {

      this.gifList = resp.data;
      console.log({gifs : this.gifList});
    })

  }

}
