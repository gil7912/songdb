<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/songs/read', 'SongController@read');
Route::post('/songs/search', 'SongController@search');
Route::post('/songs/artist', 'SongController@searchByArtistId');
Route::post('/songs/readDetail', 'SongController@readDetail');
Route::post('/songs/create', 'SongController@create');
Route::put('/songs/update', 'SongController@update');

Route::get('/artists/read', 'ArtistController@read');
Route::post('/artists/search', 'ArtistController@search');
Route::post('/artists/readDetail', 'ArtistController@readDetail');
Route::post('/artists/create', 'ArtistController@create');
Route::put('/artists/update', 'ArtistController@update');
Route::get('/artists/pulldown', 'ArtistController@readForPullDown');


Route::get('/octave/read', 'OctaveController@read');