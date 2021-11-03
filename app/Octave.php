<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Octave extends Model
{
    protected $table = 'sys_mst_octaves';
    protected $primaryKey = 'scale';
    protected $guarded = [];
    //
}
