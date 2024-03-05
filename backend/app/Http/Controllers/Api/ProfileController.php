<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Cover;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    //
    public function showUser()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }
    public function showCover()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $default_path = 'http://localhost:8000/storage/default/';
        $uploads_path = 'http://localhost:8000/storage/uploads/cover/';
        $cover =  Cover::where('user_name', $user->name)->first();
        if ($cover) {
            return response()->json([
                'status' => 200,
                'cover' => $uploads_path . $cover->cover_photo
            ]);
        }
        return response()->json([
            'status' => 200,
            'cover' => $default_path . 'cover.png'
        ]);
    }
    public function cover(Request $request)

    {
        $validator = Validator::make($request->all(), [
            'cover_photo' => 'required|mimes:png,jpg,jpeg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }
        $cover_photo = $request->file('cover_photo');

        $cover_photo_ext = $cover_photo->getClientOriginalExtension();
        $cover_photo = sha1(time()) . '.' . $cover_photo_ext;

        $id = Auth::user()->id;
        $user = User::findOrFail($id);

        $cover =  Cover::where('user_name', $user->name)->first();

        if ($cover === null) {
            $cover = new Cover;
            $cover->user_id = $user->id;
            $cover->user_name = $user->name;
            $cover->cover_photo = $cover_photo;
            $cover->save();

            $request->cover_photo->move(public_path('storage/uploads/cover/'), $cover_photo);

            return response()->json([
                'status' => 200,
                'message' => 'Cover Photo Uploaded Successfully',
            ]);
        }
        $image_path = public_path('storage/uploads/cover/' . $cover->cover_photo);
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $cover->user_id = $user->id;
        $cover->user_name = $user->name;
        $cover->cover_photo = $cover_photo;
        $cover->update();
        $request->cover_photo->move(public_path('storage/uploads/cover/'), $cover_photo);
        return response()->json([
            'status' => 200,
            'message' => 'Cover Photo Updated Successfully',
        ]);
    }
    public function showProfile()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $default_path = 'http://localhost:8000/storage/default/';
        $uploads_path = 'http://localhost:8000/storage/uploads/profile/';
        $profile =  Profile::where('user_name', $user->name)->first();

        if ($profile) {
            return response()->json([
                'status' => 200,
                'profile' => $uploads_path . $profile->profile_photo
            ]);
        }
        return response()->json([
            'status' => 200,
            'profile' => $default_path . 'profile.png'
        ]);
    }
    public function profile(Request $request)

    {
        $validator = Validator::make($request->all(), [
            'profile_photo' => 'required|mimes:png,jpg,jpeg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }
        $profile_photo = $request->file('profile_photo');

        $profile_photo_ext = $profile_photo->getClientOriginalExtension();
        $profile_photo = sha1(time()) . '.' . $profile_photo_ext;

        $id = Auth::user()->id;
        $user = User::findOrFail($id);

        $profile =  Profile::where('user_name', $user->name)->first();

        if ($profile === null) {
            $Profile = new Profile;
            $Profile->user_id = $user->id;
            $Profile->user_name = $user->name;
            $Profile->profile_photo = $profile_photo;
            $Profile->save();

            $request->profile_photo->move(public_path('storage/uploads/profile/'), $profile_photo);

            return response()->json([
                'status' => 200,
                'message' => 'Profile Photo Uploaded Successfully',
            ]);
        }
        $image_path = public_path('storage/uploads/profile/' . $profile->profile_photo);
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $profile->user_id = $user->id;
        $profile->user_name = $user->name;
        $profile->profile_photo = $profile_photo;
        $profile->update();
        $request->profile_photo->move(public_path('storage/uploads/profile/'), $profile_photo);
        return response()->json([
            'status' => 200,
            'message' => 'Profile Photo Updated Successfully',
        ]);
    }
}
