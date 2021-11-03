<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $table = 'mst_artist';
    protected $primaryKey = 'artist_id';
    protected $guarded = [];
    //
}
