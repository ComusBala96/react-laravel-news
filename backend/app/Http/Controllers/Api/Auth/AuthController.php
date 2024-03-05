<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function register(Request  $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2|max:20',
            'email' => 'required|email|unique:users,email|max:50',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required|same:password|min:6',
            'agree' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' =>  Hash::make($request->password),
                'agree' => json_decode($request->agree),
            ]);
            $arr = explode("@", $request->email);
            $user_name = $arr[0];
            $user->user_name = $user_name;
            $user->update();
        }
        $token = $user->createToken($request->email . '_token')->plainTextToken;
        if ($user) {
            return response()->json([
                'token' => $token,
                'name' => $user->name,
                'status' => 200,
                'message' => 'User Registration Successfully'
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Failed the registration process'
            ]);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                'message' => 'Validation fails',
            ]);
        }

        $user = User::where('email', $request->email)->first();


        if ($user && Hash::check($request->password, $user->password)) {
            $user->remember_token = $request->remember;
            $user->save();
            $token = $user->createToken($request->email . '_token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'name' => $user->name,
                'status' => 200,
                'message' => 'You Logged in Successfully'
            ]);
        }
        return response()->json([
            'message' => 'The Provided Credentials are incorrect',
            'status' => 401
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Loggedout Successfully',
            'status' => 200
        ]);
    }
}
