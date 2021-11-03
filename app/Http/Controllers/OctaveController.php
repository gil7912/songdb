<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Octave;

class OctaveController extends Controller
{
    //
    public function read()
    {
        $data = Octave::get();
        return $data;
    }
}
