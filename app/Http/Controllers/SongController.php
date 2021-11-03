<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Song;

class SongController extends Controller
{
    //
    public function read()
    {
        $data = Song::leftjoin('mst_artist', 'mst_song.artist_id', '=', 'mst_artist.artist_id')
            ->leftjoin('sys_mst_octaves', 'mst_song.highest_note', '=', 'sys_mst_octaves.scale')
            ->get();
        return $data;
    }

    public function search(Request $request)
    {
        $keyword = $request->searchKey;
        
        $query = Song::leftjoin('mst_artist', 'mst_song.artist_id', '=', 'mst_artist.artist_id')
        ->leftjoin('sys_mst_octaves', 'mst_song.highest_note', '=', 'sys_mst_octaves.scale')
        ->where('song_title', 'LIKE', "{$keyword}%")
        ->orWhere('song_title_jp', 'LIKE', "{$keyword}%")
        ->orWhere('song_title_en', 'LIKE', "{$keyword}%");
        $data = $query->get();
        return $data;
    }
    public function searchByArtistId(Request $request)
    {
        $artistIds = $request->artistIds;
        
        $query = Song::leftjoin('sys_mst_octaves', 'mst_song.highest_note', '=', 'sys_mst_octaves.scale')
        ->whereIn('artist_id', $artistIds);
        $data = $query->get();
        return $data;
    }
    public function readDetail(Request $request)
    {
        $songId = $request->songId;
        $data = Song::where('song_id', '=', $songId)
            ->first();
        return $data;
    }

    public function create(Request $request)
    {
        Song::create([
            'song_title' => $request->song_title,
            'song_title_jp' => $request->song_title_jp,
            'song_title_en' => $request->song_title_en,
            'artist_id' => $request->artist_id,
            'sub_artist_1' => $request->sub_artist_1,
            'sub_artist_2' => $request->sub_artist_2,
            'play_time' => $request->play_time,
            'highest_note' => $request->highest_note,
            'lowest_note' => $request->lowest_note,
            'high_score' => $request->high_score,
            'low_score' => $request->low_score,
            'memo' => $request->memo,
        ]);
    }

    public function update(Request $request)
    {
        Song::find($request->song_id)->update([
            'song_title' => $request->song_title,
            'song_title_jp' => $request->song_title_jp,
            'song_title_en' => $request->song_title_en,
            'artist_id' => $request->artist_id,
            'sub_artist_1' => $request->sub_artist_1,
            'sub_artist_2' => $request->sub_artist_2,
            'play_time' => $request->play_time,
            'highest_note' => $request->highest_note,
            'lowest_note' => $request->lowest_note,
            'high_score' => $request->high_score,
            'low_score' => $request->low_score,
            'memo' => $request->memo,
        ]);
    }
}
