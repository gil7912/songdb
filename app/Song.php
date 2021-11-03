<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = 'mst_song';
    protected $primaryKey = 'song_id';
    protected $guarded = [];
    //
}
