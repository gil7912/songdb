<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Artist;

class ArtistController extends Controller
{
    //
    public function read()
    {
        $data = Artist::from('mst_artist as main')
        ->select('main.artist_id','main.alter_1','main.alter_2','main.artist_name','alter_artist_1.artist_name as alter_name_1','alter_artist_2.artist_name as alter_name_2')
        ->leftjoin('mst_artist as alter_artist_1', 'alter_artist_1.artist_id', '=', 'main.alter_1')
        ->leftjoin('mst_artist as alter_artist_2', 'alter_artist_2.artist_id', '=', 'main.alter_2')
        ->get();
        return $data;
    }

    public function search(Request $request)
    {
        $keyword = $request->searchKey;
        
        $query = Artist::from('mst_artist as main')
        ->select('main.artist_id','main.alter_1','main.alter_2','main.artist_name','alter_artist_1.artist_name as alter_name_1','alter_artist_2.artist_name as alter_name_2')
        ->leftjoin('mst_artist as alter_artist_1', 'alter_artist_1.artist_id', '=', 'main.alter_1')
        ->leftjoin('mst_artist as alter_artist_2', 'alter_artist_2.artist_id', '=', 'main.alter_2')
        ->where('main.artist_name', 'LIKE', "{$keyword}%")
        ->orWhere('main.artist_name_jp', 'LIKE', "{$keyword}%")
        ->orWhere('main.artist_name_en', 'LIKE', "{$keyword}%");
        $data = $query->get();
        return $data;
    }

    public function readDetail(Request $request)
    {
        $artistId = $request->artistId;

        $data = Artist::where('artist_id', '=', $artistId)
        ->first();
        return $data;
    }

    public function readForPullDown()
    {
        $data = Artist::from('mst_artist as main')
        ->select('main.artist_id','main.artist_name', 'main.artist_name_jp', 'main.artist_name_en')
        ->get();
        return $data;
    }

    public function create(Request $request)
    {
        Artist::create([
            'artist_name' => $request->artist_name,
            'artist_name_jp' => $request->artist_name_jp,
            'artist_name_en' => $request->artist_name_en,
            'alter_1' => $request->alter_1,
            'alter_2' => $request->alter_2,
            'memo' => $request->memo,
        ]);
    }

    public function update(Request $request)
    {
        Artist::find($request->artist_id)->update([
            'artist_id' => $request->artist_id,
            'artist_name' => $request->artist_name,
            'artist_name_jp' => $request->artist_name_jp,
            'artist_name_en' => $request->artist_name_en,
            'alter_1' => $request->alter_1,
            'alter_2' => $request->alter_2,
            'memo' => $request->memo,
        ]);
    }
}
