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
        $data = DB::select('select * from mst_song');
        return $data;
    }
}
