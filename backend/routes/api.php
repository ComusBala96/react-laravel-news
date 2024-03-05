<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\UserPersonalizeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/show/cover', [ProfileController::class, 'showCover']);
    Route::post('cover', [ProfileController::class, 'cover']);
    Route::post('profile', [ProfileController::class, 'profile']);
    Route::get('/show/profile', [ProfileController::class, 'showProfile']);
    Route::get('/show/user', [ProfileController::class, 'showUser']);
    Route::post('/user/public/information', [UserPersonalizeController::class, 'publicInfo']);
    Route::get('/show/user/public/information', [UserPersonalizeController::class, 'showUserPublicInfo']);
    Route::post('/user/private/information', [UserPersonalizeController::class, 'privateInfo']);
    Route::get('/show/user/private/information', [UserPersonalizeController::class, 'showUserPrivateInfo']);
    Route::post('/user/email/update', [UserPersonalizeController::class, 'emailUpdate']);
    Route::post('/user/password/update', [UserPersonalizeController::class, 'passwordUpdate']);
    Route::get('/user/information', [UserPersonalizeController::class, 'userDetails']);
    Route::post('/account/delete', [UserPersonalizeController::class, 'accountDelete']);
});