<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mst_song', function (Blueprint $table) {
            $table->id('song_id');
            $table->string('song_title', 100);
            $table->string('song_title_jp', 100)->nullable();
            $table->string('song_title_en', 100)->nullable();
            $table->integer('artist_id');
            $table->integer('sub_artist_1')->nullable();
            $table->integer('sub_artist_2')->nullable();
            $table->integer('higest_note')->nullable();
            $table->integer('lowest_note')->nullable();
            $table->integer('high_score')->nullable();
            $table->integer('low_score')->nullable();
            $table->string('head_of_title', 2)->nullable();
            $table->string('tail_of_title', 2)->nullable();
            $table->string('memo', 1000)->nullable();
            $table->string('play_time')->nullable();
            $table->timestamps(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
}
