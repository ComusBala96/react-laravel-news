<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Cover;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Models\UserPublicInfo;
use App\Models\UserPrivateInfo;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserPersonalizeController extends Controller
{
    //
    public function showUserPublicInfo()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $public_info =  UserPublicInfo::where('user_id', $user->id)->first();
        return response()->json([
            'status' => 200,
            'public_info' => $public_info
        ]);
    }
    public function userDetails()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $public_info =  UserPublicInfo::where('user_id', $user->id)->first();
        $private_info =  UserPrivateInfo::where('user_id', $user->id)->first();


        if ($user && $public_info && $private_info) {
            return response()->json([
                'status' => 200,
                'userDetails' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_name' => $user->user_name,
                    'nick_name' => $public_info->nick_name,
                    'phone' => $private_info->phone_number,
                    'address' => [
                        'home' => $private_info->address,
                        'city' => $private_info->city,
                        'state' => $private_info->state,
                        'zip_code' => $private_info->zip_code,
                    ],

                ],
            ]);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Information not found',
        ]);
    }

    public function publicInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nick_name' => 'required|min:2|max:20',
            'occupation' => 'required|min:2|max:20',
            'biography' => 'max:65535',
            'impression' => 'max:65535',
            'description' => 'max:65535',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }

        $id = Auth::user()->id;
        $user = User::findOrFail($id);

        $public_info =  UserPublicInfo::where('user_id', $user->id)->first();
        if ($public_info === null) {
            $public_info = new UserPublicInfo;
            $public_info->nick_name = $request->nick_name;
            $public_info->occupation = $request->occupation;
            $public_info->biography = $request->biography;
            $public_info->description = $request->description;
            $public_info->user_id = $user->id;
            $public_info->save();
            return response()->json([
                'status' => 200,
                'message' => 'User Public Information Uploaded Successfully',

            ]);
        }
        $public_info->nick_name = $request->nick_name;
        $public_info->occupation = $request->occupation;
        $public_info->biography = $request->biography;
        $public_info->description = $request->description;
        $public_info->update();
        return response()->json([
            'status' => 200,
            'message' => 'User Public Information Updated Successfully',

        ]);
    }
    public function showUserPrivateInfo()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $private_info =  UserPrivateInfo::where('user_id', $user->id)->first();
        return response()->json([
            'status' => 200,
            'private_info' => $private_info
        ]);
    }
    public function privateInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date_of_birth' => 'required',
            'status' => 'required',
            'gender' => 'required',
            'phone_number' => 'required',
            'address' => 'required|min:6',
            'city' => 'required',
            'state' => 'required',
            'zip_code' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }

        $id = Auth::user()->id;
        $user = User::findOrFail($id);

        $private_info =  UserPrivateInfo::where('user_id', $user->id)->first();
        if ($private_info === null) {
            $private_info = new UserPrivateInfo;
            $private_info->date_of_birth = $request->date_of_birth;
            $private_info->gender = $request->gender;
            $private_info->status = $request->status;
            $private_info->phone_number = $request->phone_number;
            $private_info->address = $request->address;
            $private_info->city = $request->city;
            $private_info->state = $request->state;
            $private_info->zip_code = $request->zip_code;
            $private_info->user_id = $user->id;
            $private_info->save();
            return response()->json([
                'status' => 200,
                'message' => 'User Private Information Uploaded Successfully',

            ]);
        }
        $private_info->date_of_birth = $request->date_of_birth;
        $private_info->gender = $request->gender;
        $private_info->status = $request->status;
        $private_info->phone_number = $request->phone_number;
        $private_info->address = $request->address;
        $private_info->city = $request->city;
        $private_info->state = $request->state;
        $private_info->zip_code = $request->zip_code;
        $private_info->update();
        return response()->json([
            'status' => 200,
            'message' => 'User Private Information Updated Successfully',

        ]);
    }
    public function emailUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'new_email' => 'required|email|unique:users,email|max:50',
            'verify_email' => 'required|email|same:new_email|max:50',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }
        $userEmail =  User::where('email', $request->email)->first();
        if ($userEmail === $request->new_email) {
            return response()->json([
                'status' => 422,
                'errors' => ['new_email' => 'Email already exists'],
            ]);
        }
        $userEmail->email = $request->new_email;
        $userEmail->update();
        return response()->json([
            'status' => 200,
            'message' => 'Email updated successfully',
        ]);
    }
    public function passwordUpdate(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:6',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password|min:6',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }
        $id = Auth::user()->id;
        $userPassword = User::find($id)->getAttributes()['password'];

        if (Hash::check($request->current_password, $userPassword)) {
            if (Hash::check($request->new_password, $userPassword)) {
                return response()->json([
                    'status' => 422,
                    'errors' => ['new_password' => 'Password already exists? '],
                ]);
            }
            $new_password = Hash::make($request->new_password);
            $user = User::findOrFail($id)->first();
            $user->password = $new_password;
            $user->update();
            return response()->json([
                'status' => 200,
                'message' => 'Password Updated Successfully',
            ]);
        }
        return response()->json([
            'status' => 422,
            'errors' => ['current_password' => 'Password do not match our record? Please try another? '],
        ]);
    }
    public function accountDelete(Request $request)
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $profile = Profile::where('user_id', $id)->first();
        if ($profile) {
            $profile_path = public_path('storage/uploads/profile/' . $profile->profile_photo);
            if (File::exists($profile_path)) {
                File::delete($profile_path);
            }
            $profile->delete();
        }
        $cover = Cover::where('user_id', $id)->first();
        if ($cover) {
            $cover_path = public_path('storage/uploads/cover/' . $cover->cover_photo);
            if (File::exists($cover_path)) {
                File::delete($cover_path);
            }
            $cover->delete();
        }
        $public_info = UserPublicInfo::where('user_id', $id)->first();
        if ($public_info) {
            $public_info->delete();
        }
        $private_info = UserPrivateInfo::where('user_id', $id)->first();
        if ($private_info) {
            $private_info->delete();
        }
        $user->delete();
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Account Deleted Successfully'
        ]);
    }
}
